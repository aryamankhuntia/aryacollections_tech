'use client';

import { useState, useEffect } from 'react';
import { supabase, Saree } from '@/lib/supabase';
import { Image as ImageIcon, Plus, CheckCircle, Archive, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // New Saree Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchSarees();
  }, [isAuthenticated]);

  async function fetchSarees() {
    setLoading(true);
    const { data } = await supabase
      .from('sarees')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setSarees(data);
    setLoading(false);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !price) return alert('Please fill all required fields');

    setUploading(true);
    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('saree-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/saree-images/${fileName}`;

      // 3. Insert into Database
      const { error: dbError } = await supabase.from('sarees').insert([
        {
          title,
          price_gbp: parseFloat(price),
          fabric_type: fabric,
          color,
          image_url: imageUrl,
          status: 'available',
        },
      ]);

      if (dbError) throw dbError;

      alert('Saree added successfully!');
      // Reset form
      setTitle(''); setPrice(''); setFabric(''); setColor(''); setFile(null);
      fetchSarees(); // Refresh table
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: 'sold' | 'archived' | 'available') => {
    const { error } = await supabase
      .from('sarees')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (error) alert(`Error updating status: ${error.message}`);
    else fetchSarees();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f2eb]">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-sm border border-[#e4ddd3] w-96 text-center">
          <h1 className="font-serif text-2xl text-[#29231f] mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter secure passcode"
            className="w-full border border-[#d8d1c7] px-4 py-2 mb-4 outline-none focus:border-[#b88b3d] text-sm"
          />
          <button type="submit" className="w-full bg-[#29231f] text-white text-xs uppercase tracking-widest py-3 hover:bg-[#b88b3d] transition-colors">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="min-h-screen bg-[#f6f2eb] p-6 lg:p-12 text-[#29231f]">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-serif text-3xl">Inventory Management</h1>
            <p className="text-xs uppercase tracking-widest text-[#b88b3d] mt-2">Vasthiram Admin</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-xs uppercase underline">Logout</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Saree Form */}
          <div className="bg-white p-6 rounded-sm border border-[#e4ddd3] h-fit">
            <h2 className="font-serif text-xl mb-5 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Saree</h2>
            <form onSubmit={handleUpload} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs uppercase text-[#665d55] mb-1">Title *</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-[#e4ddd3] p-2 outline-none focus:border-[#b88b3d]" placeholder="e.g. Red Banarasi Silk"/>
              </div>
              <div>
                <label className="block text-xs uppercase text-[#665d55] mb-1">Price (£) *</label>
                <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-[#e4ddd3] p-2 outline-none focus:border-[#b88b3d]" placeholder="65.00"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#665d55] mb-1">Fabric</label>
                  <input value={fabric} onChange={e => setFabric(e.target.value)} className="w-full border border-[#e4ddd3] p-2 outline-none focus:border-[#b88b3d]" placeholder="e.g. Silk"/>
                </div>
                <div>
                  <label className="block text-xs uppercase text-[#665d55] mb-1">Color</label>
                  <input value={color} onChange={e => setColor(e.target.value)} className="w-full border border-[#e4ddd3] p-2 outline-none focus:border-[#b88b3d]" placeholder="e.g. Red"/>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-[#665d55] mb-1">Upload Image *</label>
                <div className="border-2 border-dashed border-[#e4ddd3] p-4 text-center cursor-pointer hover:bg-[#faf8f4]">
                  <input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-xs"/>
                </div>
              </div>
              <button disabled={uploading} type="submit" className="w-full bg-[#21863b] text-white text-xs uppercase tracking-widest py-3 flex justify-center items-center gap-2 hover:bg-[#176d2e] transition-colors disabled:opacity-50">
                {uploading ? <><Loader2 className="w-4 h-4 animate-spin"/> Uploading...</> : 'Publish to Store'}
              </button>
            </form>
          </div>

          {/* Inventory Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-[#e4ddd3] overflow-x-auto">
            <h2 className="font-serif text-xl mb-5">Current Inventory</h2>
            {loading ? (
              <p className="text-sm text-[#665d55]">Loading inventory...</p>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#e4ddd3] text-xs uppercase text-[#665d55]">
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sarees.map((saree) => (
                    <tr key={saree.id} className="border-b border-[#faf8f4] hover:bg-[#faf8f4]">
                      <td className="py-3 flex items-center gap-3">
                        <div className="w-10 h-10 relative bg-[#ebe6de] rounded-sm overflow-hidden">
                          <Image src={saree.image_url} alt="saree" fill className="object-cover" sizes="40px" />
                        </div>
                        <span className="font-serif text-[#29231f]">{saree.title}</span>
                      </td>
                      <td className="py-3 text-[#a54839] font-medium">£{saree.price_gbp.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                          saree.status === 'available' ? 'bg-[#e8f3eb] text-[#21863b]' : 
                          saree.status === 'sold' ? 'bg-[#fbebe9] text-[#a54839]' : 
                          'bg-[#ebe6de] text-[#665d55]'
                        }`}>
                          {saree.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {saree.status === 'available' && (
                          <button onClick={() => updateStatus(saree.id, 'sold')} className="text-xs text-[#21863b] hover:underline mr-3">
                            Mark Sold
                          </button>
                        )}
                        {saree.status !== 'archived' && (
                          <button onClick={() => updateStatus(saree.id, 'archived')} className="text-xs text-[#665d55] hover:underline">
                            Archive
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}