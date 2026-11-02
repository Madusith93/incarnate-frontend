'use client';

import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code2, ImagePlus, Italic, Link2, Link2Off, List, ListOrdered,
  Palette, Redo2, RemoveFormatting, Strikethrough, Table2, Underline as UnderlineIcon, Undo2, Rows3, Columns3, Trash2,
} from 'lucide-react';

interface Props {
  name: string;
  initialHtml: string;
  onDirty?: () => void;
}

function ToolBtn({ label, on, active, disabled, off, children }: { label: string; on: () => void; active?: boolean; disabled?: boolean; off?: boolean; children: React.ReactNode }) {
  return (
    <button type="button" className="rte-btn" title={label} aria-label={label} aria-pressed={active} disabled={disabled || off} onClick={on}>
      {children}
    </button>
  );
}

export default function RichTextEditor({ name, initialHtml, onDirty }: Props) {
  const [html, setHtml] = useState(initialHtml);
  const [source, setSource] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
    ],
    content: initialHtml,
    editorProps: { attributes: { class: 'cms-prose', 'aria-label': 'Rich text editor', 'data-placeholder': 'Start writing…' } },
    onUpdate: ({ editor: e }) => {
      setHtml(e.isEmpty ? '' : e.getHTML());
      onDirty?.();
    },
  });

  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e?.isActive('bold') ?? false,
      italic: e?.isActive('italic') ?? false,
      underline: e?.isActive('underline') ?? false,
      strike: e?.isActive('strike') ?? false,
      bullet: e?.isActive('bulletList') ?? false,
      ordered: e?.isActive('orderedList') ?? false,
      link: e?.isActive('link') ?? false,
      inTable: e?.isActive('table') ?? false,
      left: e?.isActive({ textAlign: 'left' }) ?? false,
      center: e?.isActive({ textAlign: 'center' }) ?? false,
      right: e?.isActive({ textAlign: 'right' }) ?? false,
      justify: e?.isActive({ textAlign: 'justify' }) ?? false,
      block: e?.isActive('heading', { level: 2 }) ? 'h2'
        : e?.isActive('heading', { level: 3 }) ? 'h3'
        : e?.isActive('heading', { level: 4 }) ? 'h4'
        : e?.isActive('blockquote') ? 'quote'
        : e?.isActive('codeBlock') ? 'code' : 'p',
      canUndo: e?.can().undo() ?? false,
      canRedo: e?.can().redo() ?? false,
    }),
  });

  if (!editor || !s) {
    return <div className="rte"><div className="rte-area" style={{ color: 'var(--muted)' }}>Loading editor…</div></div>;
  }

  const chain = () => editor.chain().focus();

  function setBlock(v: string) {
    const c = chain();
    if (v === 'p') c.setParagraph().run();
    else if (v === 'quote') c.setParagraph().toggleBlockquote().run();
    else if (v === 'code') c.toggleCodeBlock().run();
    else c.setHeading({ level: Number(v[1]) as 2 | 3 | 4 }).run();
  }

  function setLink() {
    const prev = editor!.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link address (https://…, /page, mailto:…)', prev ?? 'https://');
    if (url === null) return;
    if (url.trim() === '') chain().unsetLink().run();
    else chain().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setUploadError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed.');
      const alt = window.prompt('Describe the image for screen readers and search engines (alt text)', '') ?? '';
      chain().setImage({ src: json.url, alt }).run();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  function toggleSource() {
    if (source) {
      editor!.commands.setContent(html, { emitUpdate: false });
      setHtml(editor!.isEmpty ? '' : editor!.getHTML());
    } else {
      setHtml(editor!.isEmpty ? '' : editor!.getHTML());
    }
    setSource(!source);
  }

  return (
    <div>
      <input type="hidden" name={name} value={html} />
      <div className="rte">
        <div className="rte-bar" role="toolbar" aria-label="Formatting">
          <div className="rte-grp">
            <ToolBtn off={source} label="Undo" on={() => chain().undo().run()} disabled={!s.canUndo}><Undo2 size={16} /></ToolBtn>
            <ToolBtn off={source} label="Redo" on={() => chain().redo().run()} disabled={!s.canRedo}><Redo2 size={16} /></ToolBtn>
          </div>
          <div className="rte-grp">
            <select className="rte-select" aria-label="Text format" value={s.block} disabled={source} onChange={(e) => setBlock(e.target.value)}>
              <option value="p">Paragraph</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="quote">Quote</option>
              <option value="code">Code block</option>
            </select>
          </div>
          <div className="rte-grp">
            <ToolBtn off={source} label="Bold" active={s.bold} on={() => chain().toggleBold().run()}><Bold size={16} /></ToolBtn>
            <ToolBtn off={source} label="Italic" active={s.italic} on={() => chain().toggleItalic().run()}><Italic size={16} /></ToolBtn>
            <ToolBtn off={source} label="Underline" active={s.underline} on={() => chain().toggleUnderline().run()}><UnderlineIcon size={16} /></ToolBtn>
            <ToolBtn off={source} label="Strikethrough" active={s.strike} on={() => chain().toggleStrike().run()}><Strikethrough size={16} /></ToolBtn>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <ToolBtn off={source} label="Text colour" on={() => colorRef.current?.click()}><Palette size={16} /></ToolBtn>
              <input
                ref={colorRef}
                type="color"
                aria-label="Pick text colour"
                tabIndex={-1}
                style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }}
                onChange={(e) => chain().setColor(e.target.value).run()}
              />
            </span>
            <ToolBtn off={source} label="Clear formatting" on={() => chain().unsetAllMarks().clearNodes().unsetColor().run()}><RemoveFormatting size={16} /></ToolBtn>
          </div>
          <div className="rte-grp">
            <ToolBtn off={source} label="Align left" active={s.left} on={() => chain().setTextAlign('left').run()}><AlignLeft size={16} /></ToolBtn>
            <ToolBtn off={source} label="Align centre" active={s.center} on={() => chain().setTextAlign('center').run()}><AlignCenter size={16} /></ToolBtn>
            <ToolBtn off={source} label="Align right" active={s.right} on={() => chain().setTextAlign('right').run()}><AlignRight size={16} /></ToolBtn>
            <ToolBtn off={source} label="Justify" active={s.justify} on={() => chain().setTextAlign('justify').run()}><AlignJustify size={16} /></ToolBtn>
          </div>
          <div className="rte-grp">
            <ToolBtn off={source} label="Bulleted list" active={s.bullet} on={() => chain().toggleBulletList().run()}><List size={16} /></ToolBtn>
            <ToolBtn off={source} label="Numbered list" active={s.ordered} on={() => chain().toggleOrderedList().run()}><ListOrdered size={16} /></ToolBtn>
          </div>
          <div className="rte-grp">
            <ToolBtn off={source} label="Add or edit link" active={s.link} on={setLink}><Link2 size={16} /></ToolBtn>
            <ToolBtn off={source} label="Remove link" on={() => chain().unsetLink().run()} disabled={!s.link}><Link2Off size={16} /></ToolBtn>
            <ToolBtn off={source} label={uploading ? 'Uploading…' : 'Insert image'} on={() => fileRef.current?.click()} disabled={uploading}><ImagePlus size={16} /></ToolBtn>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
              hidden
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
            />
          </div>
          <div className="rte-grp">
            <ToolBtn off={source} label="Insert table" on={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table2 size={16} /></ToolBtn>
            {s.inTable && (
              <>
                <ToolBtn off={source} label="Add row below" on={() => chain().addRowAfter().run()}><Rows3 size={16} /></ToolBtn>
                <ToolBtn off={source} label="Add column after" on={() => chain().addColumnAfter().run()}><Columns3 size={16} /></ToolBtn>
                <ToolBtn off={source} label="Delete table" on={() => chain().deleteTable().run()}><Trash2 size={16} /></ToolBtn>
              </>
            )}
          </div>
          <div className="rte-grp">
            <button type="button" className="rte-btn" aria-pressed={source} title="Edit HTML source" onClick={toggleSource}>
              <Code2 size={16} />&nbsp;HTML
            </button>
          </div>
        </div>

        {source ? (
          <textarea
            className="rte-source"
            aria-label="HTML source"
            spellCheck={false}
            value={html}
            onChange={(e) => { setHtml(e.target.value); onDirty?.(); }}
          />
        ) : (
          <div className="rte-area">
            <EditorContent editor={editor} />
          </div>
        )}

        <div className="rte-foot">
          <span>{uploadError ? <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{uploadError}</span> : source ? 'HTML is cleaned when you save.' : ''}</span>
          <span>Words: {html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length}</span>
        </div>
      </div>
    </div>
  );
}
