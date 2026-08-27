import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  Upload,
  Loader2,
  X,
  Sparkles,
  HelpCircle,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';
import { sanityClient } from '../../../lib/sanityClient';
import MarkdownRenderer from '../../../components/MarkdownRenderer';

interface BlogRichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Preset list of website internal pages for easy 1-click linking
const INTERNAL_PAGES = [
  { label: '--- Select an Internal Page ---', value: '' },
  { label: 'Solar Calculator', value: '/calculator' },
  { label: 'Contact Us / Free Site Survey', value: '/contact' },
  { label: 'Solar Solutions Overview', value: '/solar-solutions' },
  { label: 'On-Grid Solar Systems', value: '/on-grid-solar' },
  { label: 'Off-Grid Solar Systems', value: '/off-grid-solar' },
  { label: 'Hybrid Solar Systems', value: '/hybrid-solar' },
  { label: 'Solar Inverters', value: '/inverters' },
  { label: 'Lithium Batteries', value: '/lithium-batteries' },
  { label: 'Tubular Batteries', value: '/tubular-batteries' },
  { label: 'Solar Water Heaters', value: '/solar-water-heaters' },
  { label: 'Power Backup Overview', value: '/power-backup' },
  { label: 'Home UPS', value: '/home-ups' },
  { label: 'Online UPS', value: '/online-ups' },
  { label: 'Lithium UPS', value: '/lithium-ups' },
  { label: 'Support & FAQs', value: '/support' },
  { label: 'About Spectrum Solar', value: '/about' },
  { label: 'Partnership Opportunities', value: '/opportunities' },
  { label: 'Franchise Program', value: '/franchise' },
  { label: 'Dealership Network', value: '/dealership' },
  { label: 'Freelance Partner', value: '/freelance' },
  { label: 'Careers', value: '/careers' },
  { label: 'Photo Gallery', value: '/gallery' },
  { label: 'Completed Projects', value: '/projects' },
];

export default function BlogRichEditor({ value, onChange }: BlogRichEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Link Modal State
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedInternalPage, setSelectedInternalPage] = useState('');
  const [customLinkUrl, setCustomLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Image / GIF Modal State
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);

  // Guide Modal State
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Stats calculation
  const wordCount = (value || '').trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Slash Command (Notion-style) Menu State
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [slashIndex, setSlashIndex] = useState(0);
  const [slashCursorPos, setSlashCursorPos] = useState<number | null>(null);

  const slashCommands = [
    { id: 'h2', label: 'Section Heading (H2)', desc: 'Large section title', icon: Heading2, action: () => executeSlashCommand('## ') },
    { id: 'h3', label: 'Subheading (H3)', desc: 'Medium subsection title', icon: Heading3, action: () => executeSlashCommand('### ') },
    { id: 'image', label: 'Upload Image / GIF', desc: 'Embed photo from computer or link', icon: ImageIcon, action: () => { removeSlashTrigger(); handleOpenImageModal(); } },
    { id: 'link', label: 'Insert Internal Link', desc: 'Link to Calculator, Solar pages, etc.', icon: LinkIcon, action: () => { removeSlashTrigger(); handleOpenLinkModal(); } },
    { id: 'list', label: 'Bullet List', desc: 'Create a bulleted feature list', icon: List, action: () => executeSlashCommand('- ') },
    { id: 'steps', label: 'Numbered Steps', desc: 'Create a step-by-step numbered list', icon: ListOrdered, action: () => executeSlashCommand('1. ') },
    { id: 'quote', label: 'Callout Quote', desc: 'Emphasize a highlight or key quote', icon: Quote, action: () => executeSlashCommand('> ') },
    { id: 'bold', label: 'Bold Text', desc: 'Make keywords stand out', icon: Bold, action: () => executeSlashCommand('**bold text**') },
  ];

  const filteredCommands = slashCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(slashQuery.toLowerCase()) ||
    cmd.id.toLowerCase().includes(slashQuery.toLowerCase())
  );

  const removeSlashTrigger = () => {
    setShowSlashMenu(false);
    if (slashCursorPos === null) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Remove the "/" or "/query" from textarea
    const textBefore = value.substring(0, slashCursorPos);
    const textAfter = value.substring(textarea.selectionStart);
    onChange(textBefore + textAfter);
    setSlashCursorPos(null);
  };

  const executeSlashCommand = (replacement: string) => {
    setShowSlashMenu(false);
    const textarea = textareaRef.current;
    if (!textarea || slashCursorPos === null) return;

    const textBefore = value.substring(0, slashCursorPos);
    const textAfter = value.substring(textarea.selectionStart);
    const newText = textBefore + replacement + textAfter;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newPos = textBefore.length + replacement.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 50);

    setSlashCursorPos(null);
  };

  // Drag & Drop / Clipboard Paste direct upload to Sanity CDN
  const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await uploadAndInsertDirectImage(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          await uploadAndInsertDirectImage(file);
          return;
        }
      }
    }
  };

  const uploadAndInsertDirectImage = async (file: File) => {
    setUploadingInlineImage(true);
    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name
      });
      const caption = file.name.replace(/\.[^/.]+$/, '');
      insertFormatting(`\n\n![${caption}](`, `${asset.url})\n\n`, '');
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert('Failed to upload dropped image.');
    } finally {
      setUploadingInlineImage(false);
    }
  };

  // Helper to insert formatted text at current cursor position
  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultPlaceholder;

    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  // Handle typing to detect "/"
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newVal.substring(0, cursorPos);
    const lastSlashIdx = textBeforeCursor.lastIndexOf('/');

    if (lastSlashIdx !== -1 && (lastSlashIdx === 0 || textBeforeCursor[lastSlashIdx - 1] === '\n' || textBeforeCursor[lastSlashIdx - 1] === ' ')) {
      const query = textBeforeCursor.substring(lastSlashIdx + 1);
      if (!query.includes(' ') && !query.includes('\n')) {
        setShowSlashMenu(true);
        setSlashQuery(query);
        setSlashIndex(0);
        setSlashCursorPos(lastSlashIdx);
        return;
      }
    }

    setShowSlashMenu(false);
    setSlashCursorPos(null);
  };

  // Handle keyboard shortcuts in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSlashMenu && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSlashIndex((prev) => (prev + 1) % filteredCommands.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSlashIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[slashIndex].action();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowSlashMenu(false);
        return;
      }
    }
  };

  // 1-Click Link Inserter
  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selectedText = value.substring(textarea.selectionStart, textarea.selectionEnd);
      setLinkText(selectedText);
    }
    setSelectedInternalPage('');
    setCustomLinkUrl('');
    setShowLinkModal(true);
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = selectedInternalPage || customLinkUrl;
    if (!finalUrl) return;

    const displayText = linkText || 'Click here';
    insertFormatting(`[${displayText}](`, `${finalUrl})`, '');
    setShowLinkModal(false);
  };

  // 1-Click Inline Image / GIF Inserter
  const handleOpenImageModal = () => {
    setImageUrl('');
    setImageCaption('');
    setImageUploadType('upload');
    setShowImageModal(true);
  };

  const handleInlineImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingInlineImage(true);
    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name
      });
      const caption = imageCaption || file.name.replace(/\.[^/.]+$/, '');
      insertFormatting(`\n\n![${caption}](`, `${asset.url})\n\n`, '');
      setShowImageModal(false);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingInlineImage(false);
    }
  };

  const handleApplyImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    const caption = imageCaption || 'Illustration';
    insertFormatting(`\n\n![${caption}](`, `${imageUrl})\n\n`, '');
    setShowImageModal(false);
  };

  return (
    <div className="space-y-3">
      {/* Top Header: Actions & Mode Switcher (Strict Single Row) */}
      <div className="flex items-center justify-between gap-3 bg-zinc-950 p-2 rounded-2xl border border-zinc-850 overflow-x-auto custom-scrollbar">
        {/* Left Side: Formatting Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Heading 2 (Major Section)"
            onClick={() => insertFormatting('\n\n## ', '\n', 'Heading Text')}
            className="px-2 py-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs flex items-center gap-1"
          >
            <Heading2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">H2</span>
          </button>

          <button
            type="button"
            title="Heading 3 (Subsection)"
            onClick={() => insertFormatting('\n\n### ', '\n', 'Subheading Text')}
            className="px-2 py-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs flex items-center gap-1"
          >
            <Heading3 className="w-3.5 h-3.5" />
            <span className="text-[10px]">H3</span>
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

          <button
            type="button"
            title="Bold Text"
            onClick={() => insertFormatting('**', '**', 'bold text')}
            className="p-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Italic Text"
            onClick={() => insertFormatting('*', '*', 'italic text')}
            className="p-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

          <button
            type="button"
            title="Bullet Points"
            onClick={() => insertFormatting('\n- ', '\n', 'First bullet point')}
            className="px-2 py-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs flex items-center gap-1"
          >
            <List className="w-3.5 h-3.5" />
            <span className="text-[10px]">List</span>
          </button>

          <button
            type="button"
            title="Numbered Steps"
            onClick={() => insertFormatting('\n1. ', '\n', 'Step one description')}
            className="px-2 py-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs flex items-center gap-1"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span className="text-[10px]">Steps</span>
          </button>

          <button
            type="button"
            title="Callout Quote"
            onClick={() => insertFormatting('\n> ', '\n', 'Key takeaway or important highlight quote...')}
            className="px-2 py-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs flex items-center gap-1"
          >
            <Quote className="w-3.5 h-3.5" />
            <span className="text-[10px]">Quote</span>
          </button>

          <button
            type="button"
            title="Inline Highlight / Code"
            onClick={() => insertFormatting('`', '`', 'specification or value')}
            className="p-1.5 hover:bg-zinc-850 text-zinc-300 hover:text-yellow-400 rounded-xl transition-all font-bold text-xs"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

          {/* 1-Click Link Button */}
          <button
            type="button"
            title="Insert Internal or External Link"
            onClick={handleOpenLinkModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-xl transition-all text-xs font-bold shadow-sm"
          >
            <LinkIcon className="w-3 h-3" />
            <span className="text-[11px]">Insert Link</span>
          </button>

          {/* 1-Click Image / GIF Button */}
          <button
            type="button"
            title="Insert In-Article Image or GIF"
            onClick={handleOpenImageModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl transition-all text-xs font-bold shadow-sm"
          >
            <ImageIcon className="w-3 h-3" />
            <span className="text-[11px]">Add Image/GIF</span>
          </button>
        </div>

        {/* Right Controls: Guide & Preview Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 📖 Formatting Guide Button */}
          <button
            type="button"
            title="Formatting Guide & Pointers"
            onClick={() => setShowGuideModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl transition-all text-xs font-bold shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[11px]">Formatting Guide</span>
          </button>

          {/* Edit vs Live Preview Switcher */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'edit'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span className="text-[11px]">Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-yellow-400 text-zinc-950 shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span className="text-[11px]">Live Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Body Area */}
      {activeTab === 'edit' ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            required
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            onDrop={handleDrop}
            onPaste={handlePaste}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
            onDragLeave={() => setIsDraggingOver(false)}
            className={`w-full bg-zinc-950 border text-zinc-200 rounded-2xl p-5 pb-12 text-sm focus:border-yellow-400/50 outline-none font-mono leading-relaxed min-h-[380px] resize-y custom-scrollbar transition-all ${
              isDraggingOver ? 'border-yellow-400 border-dashed bg-yellow-400/5' : 'border-zinc-850'
            }`}
            placeholder="Write your article here... Type '/' anywhere for quick 1-click blocks, or drag & drop photos directly into this box."
          />

          {/* Drag & Drop Visual Overlay */}
          {isDraggingOver && (
            <div className="absolute inset-0 pointer-events-none rounded-2xl bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 text-yellow-400 font-bold text-sm">
              <Upload className="w-8 h-8 animate-bounce" />
              <span>Drop Image File Here to Embed & Upload</span>
            </div>
          )}

          {/* Floating Notion-Style Slash Command Menu */}
          {showSlashMenu && filteredCommands.length > 0 && (
            <div className="absolute top-12 left-6 z-40 w-72 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span>Basic Blocks</span>
                <span className="text-zinc-600 font-mono">ESC to close</span>
              </div>
              <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                {filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === slashIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={cmd.action}
                      onMouseEnter={() => setSlashIndex(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-yellow-400 text-zinc-950 font-semibold'
                          : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-yellow-400'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold">{cmd.label}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-zinc-900/80' : 'text-zinc-500'}`}>
                          {cmd.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Stats & Helper Bottom Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono pointer-events-none bg-zinc-950/90 py-1.5 px-3 rounded-xl border border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 font-semibold">{wordCount} words</span>
              <span className="text-zinc-600">•</span>
              <span className="text-yellow-400/90 font-medium">⏱️ {estimatedReadTime}</span>
            </div>
            <div className="text-[10px] text-zinc-600">
              Type <span className="text-zinc-400 font-bold">/</span> for blocks • Drag & Drop images • Markdown supported
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-zinc-950 border border-zinc-850 rounded-2xl p-8 min-h-[380px] overflow-y-auto max-h-[550px] custom-scrollbar">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-900 text-xs text-yellow-400 font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Live Article Preview (How it will look on website)</span>
          </div>
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-zinc-600 text-sm italic">Nothing to preview yet. Switch back to Editor and add some content!</p>
          )}
        </div>
      )}

      {/* MODAL 1: Insert Link Helper */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-yellow-400" />
                <h4 className="font-bold text-white text-base">Insert Internal or External Link</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLink} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Link Display Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Solar Calculator or On-Grid Solar Systems"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2.5 px-4 text-sm focus:border-yellow-400/50 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Choose Website Page (Quick Select)
                </label>
                <select
                  value={selectedInternalPage}
                  onChange={(e) => {
                    setSelectedInternalPage(e.target.value);
                    if (e.target.value) setCustomLinkUrl('');
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2.5 px-4 text-sm focus:border-yellow-400/50 outline-none"
                >
                  {INTERNAL_PAGES.map((page) => (
                    <option key={page.value} value={page.value} className="bg-zinc-950 text-white">
                      {page.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-center text-xs text-zinc-500 font-semibold uppercase tracking-widest">
                — OR Custom / External URL —
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  External URL / Custom Link
                </label>
                <input
                  type="text"
                  value={customLinkUrl}
                  disabled={!!selectedInternalPage}
                  onChange={(e) => setCustomLinkUrl(e.target.value)}
                  placeholder="e.g. https://kseb.in or /any-page"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2.5 px-4 text-sm focus:border-yellow-400/50 outline-none disabled:opacity-40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedInternalPage && !customLinkUrl}
                  className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Insert Image / GIF Helper */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-white text-base">Insert In-Article Image or GIF</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Type selector tabs */}
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setImageUploadType('upload')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  imageUploadType === 'upload' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
                }`}
              >
                Upload from Computer (Sanity CDN)
              </button>
              <button
                type="button"
                onClick={() => setImageUploadType('url')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  imageUploadType === 'url' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'
                }`}
              >
                Paste Image / GIF URL
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Image Caption / Description (Optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="e.g. Solar panel installation diagram"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2.5 px-4 text-sm focus:border-yellow-400/50 outline-none"
                />
              </div>

              {imageUploadType === 'upload' ? (
                <div className="p-6 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50 text-center space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInlineImageFileUpload}
                    className="hidden"
                    id="inline-image-file-upload"
                    disabled={uploadingInlineImage}
                  />
                  <label
                    htmlFor="inline-image-file-upload"
                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-3 px-6 rounded-xl cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    {uploadingInlineImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingInlineImage ? 'Uploading to Cloud CDN...' : 'Choose Image File'}</span>
                  </label>
                  <p className="text-[11px] text-zinc-500">Supports PNG, JPG, WebP, GIF files up to 10MB</p>
                </div>
              ) : (
                <form onSubmit={handleApplyImageUrl} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Direct Image or GIF URL
                    </label>
                    <input
                      type="url"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.png or GIF link"
                      className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2.5 px-4 text-sm focus:border-yellow-400/50 outline-none font-mono text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowImageModal(false)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!imageUrl}
                      className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md"
                    >
                      Insert Image
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Interactive User Guide & Writing Tips */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">How to Write & Publish a Blog Post</h3>
                  <p className="text-xs text-zinc-400">Simple 4-step guide for creating engaging articles with images and links.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-2 hover:bg-zinc-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick 1-Click Template Loader */}
            <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Want an instant sample article?</span>
                <p className="text-xs text-zinc-300 mt-0.5">Loads a pre-written solar guide with headings, bullet points, and links that you can easily edit.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const sampleTemplate = `Under the central government PM Surya Ghar Muft Bijli Yojana, homeowners in Kerala can claim direct subsidies for rooftop solar systems.

## Key Benefits of Going Solar

- **Massive Bill Reduction**: Cut your monthly KSEB electricity bill by up to 90%.
- **Government Subsidy**: Direct bank transfer up to ₹78,000 for residential systems.
- **Fast Payback Period**: Full return on investment within 3 to 4 years.

### Recommended System Sizes for Homes

1. **3 kW System**: Ideal for typical 3-4 bedroom homes with basic appliances.
2. **5 kW System**: Ideal for homes running 2+ Air Conditioners and EV charging.

> "Investing in rooftop solar offers an average annual return of 25-30%, outperforming traditional bank deposits and mutual funds."

Ready to calculate your exact monthly savings? Check out our [Solar Calculator](/calculator) or schedule a free site survey with our [Engineering Team](/contact).`;
                  onChange(sampleTemplate);
                  setCopiedExample(true);
                  setTimeout(() => setCopiedExample(false), 2500);
                  setShowGuideModal(false);
                }}
                className="shrink-0 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                {copiedExample ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedExample ? 'Template Inserted!' : 'Load Sample Template'}</span>
              </button>
            </div>

            {/* Step-by-Step User Instructions */}
            <div className="space-y-4">
              {/* Step 1: Headings */}
              <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl flex gap-4">
                <div className="w-7 h-7 rounded-xl bg-yellow-400 text-zinc-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Dividing Your Post into Sections (Headings)</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Highlight any title sentence you wrote and click <strong className="text-yellow-400">H2</strong> for a main section, or <strong className="text-yellow-400">H3</strong> for a subtopic. You can also type <strong className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded font-mono">/h2</strong> on any new line.
                  </p>
                </div>
              </div>

              {/* Step 2: Images & Photos */}
              <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl flex gap-4">
                <div className="w-7 h-7 rounded-xl bg-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Adding Photos, Diagrams & GIFs</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Click <strong className="text-blue-400">Add Image/GIF</strong> to pick a photo from your computer (it uploads automatically to the cloud). Or simply <strong className="text-zinc-200">drag and drop an image file</strong> directly into the writing box!
                  </p>
                </div>
              </div>

              {/* Step 3: Links */}
              <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl flex gap-4">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Linking to Website Pages (e.g., Solar Calculator, Products)</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Highlight the words you want to link (e.g. <em>"Use our solar calculator"</em>), click <strong className="text-emerald-400">Insert Link</strong>, and select the page from the dropdown.
                  </p>
                </div>
              </div>

              {/* Step 4: Lists & Quotes */}
              <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl flex gap-4">
                <div className="w-7 h-7 rounded-xl bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Bullet Points & Highlights</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Click <strong className="text-zinc-200">List</strong> for bullet features, <strong className="text-zinc-200">Steps</strong> for 1-2-3 guides, or <strong className="text-zinc-200">Quote</strong> to highlight a key customer takeaway.
                  </p>
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex items-center gap-3 text-xs text-zinc-400">
                <span className="text-lg">💡</span>
                <span>
                  <strong className="text-white">Pro Tip:</strong> Click the <strong className="text-yellow-400">Live Preview</strong> tab at any time to see exactly how your article will look to visitors before saving!
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                Got It, Let's Write!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
