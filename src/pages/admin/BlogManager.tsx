import React, { useState, useEffect } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { Plus, Edit2, Trash2, Save, X, Loader2, Upload, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BlogPost {
  _id?: string;
  title: string;
  slug: { current: string };
  coverImage?: string;
  publishedAt: string;
  excerpt: string;
  body: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const result = await sanityClient.fetch(`*[_type == "blog"] | order(publishedAt desc)`);
      setBlogs(result || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setStatus(null);
  };

  const handleCreateNew = () => {
    setEditingBlog({
      title: '',
      slug: { current: '' },
      publishedAt: new Date().toISOString().split('T')[0],
      excerpt: '',
      body: ''
    });
    setStatus(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await sanityClient.delete(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setSaving(true);
    setStatus(null);

    // Make sure slug is valid
    const slugValue = editingBlog.slug.current || editingBlog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    try {
      const doc = {
        _type: 'blog',
        title: editingBlog.title,
        slug: { _type: 'slug', current: slugValue },
        coverImage: editingBlog.coverImage,
        publishedAt: new Date(editingBlog.publishedAt).toISOString(),
        excerpt: editingBlog.excerpt,
        body: editingBlog.body,
      };

      if (editingBlog._id) {
        // Update
        await sanityClient.createOrReplace({ ...doc, _id: editingBlog._id });
        setStatus({ type: 'success', message: 'Blog post updated!' });
      } else {
        // Create
        await sanityClient.create(doc);
        setStatus({ type: 'success', message: 'New blog post created!' });
      }

      setEditingBlog(null);
      fetchBlogs();
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: err.message || 'Failed to save blog post.' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBlog) return;

    setUploadingImage(true);
    try {
      const asset = await sanityClient.assets.upload('image', file, {
        filename: file.name
      });
      setEditingBlog((prev) => prev ? { ...prev, coverImage: asset.url } : null);
    } catch (err: any) {
      console.error(err);
      alert('Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Loading blogs list...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Blog List Header */}
      {!editingBlog && (
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-zinc-400">Manage blog posts published on the website.</p>
          <button
            onClick={handleCreateNew}
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>
      )}

      {/* Editor Modal / Form */}
      {editingBlog && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <h3 className="text-base font-semibold">
              {editingBlog._id ? 'Edit Blog Post' : 'New Blog Post'}
            </h3>
            <button
              onClick={() => setEditingBlog(null)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {status && (
            <div
              className={`flex items-start gap-3 p-4 rounded-2xl border ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Blog Title
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none"
                  placeholder="e.g., The Future of Solar energy in India"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Publish Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="date"
                    required
                    value={editingBlog.publishedAt.split('T')[0]}
                    onChange={(e) => setEditingBlog({ ...editingBlog, publishedAt: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 text-sm focus:border-yellow-400/50 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">
                Cover Image
              </label>
              <div className="flex items-center gap-6 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="w-24 h-24 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
                  {editingBlog.coverImage ? (
                    <img src={editingBlog.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-600 text-xs">No Cover</span>
                  )}
                </div>
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="blog-image-upload"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="blog-image-upload"
                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : editingBlog.coverImage ? 'Replace Cover Image' : 'Upload Cover Image'}</span>
                  </label>

                  {editingBlog.coverImage && (
                    <button
                      type="button"
                      onClick={() => setEditingBlog({ ...editingBlog, coverImage: '' })}
                      className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-rose-400 hover:text-rose-300 font-semibold text-xs py-2.5 px-3.5 rounded-xl transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Brief Excerpt
              </label>
              <textarea
                required
                value={editingBlog.excerpt}
                onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-4 text-sm focus:border-yellow-400/50 outline-none transition-all duration-300 h-9 focus:h-24 resize-none py-2.5 overflow-y-auto"
                placeholder="A one-sentence summary shown on the blog listing page."
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Body Content
              </label>
              <textarea
                required
                value={editingBlog.body}
                onChange={(e) => setEditingBlog({ ...editingBlog, body: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 px-4 text-sm focus:border-yellow-400/50 outline-none font-mono transition-all duration-300 h-28 focus:h-80 resize-none py-2.5 overflow-y-auto"
                placeholder="Write your blog post content here..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-zinc-850">
              <button
                type="button"
                onClick={() => setEditingBlog(null)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-zinc-950 font-semibold py-3 px-6 rounded-2xl transition-all flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" />
                <span>Save Post</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Cards Grid */}
      {!editingBlog && (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300"
            >
              <div>
                <div className="aspect-video w-full rounded-2xl bg-zinc-950 border border-zinc-850 overflow-hidden mb-4">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm">
                      No cover image
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-lg text-white mb-2 line-clamp-1">{blog.title}</h4>
                <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed mb-6">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-zinc-850">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(blog._id!)}
                  className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
