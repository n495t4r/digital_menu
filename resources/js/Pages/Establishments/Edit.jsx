import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
// import TikTokIcon from "@/Components/TikTokIcon";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Checkbox from "@/Components/Checkbox";

import { 
    Instagram, Facebook, Twitter
} from "lucide-react";

import { 
    MapPin, 
    Link2, Palette, Upload, Globe, Lock, Wifi, 
    Settings, Database, ShoppingCart, Key
} from "lucide-react";

// import { Twitter as TwitterIcon } from 'simple-icons';

export default function Edit({ establishment }) {
    const { data, setData, post, errors } = useForm({
        name: establishment.name || '',
        description: establishment.description || '',
        slug: establishment.slug || '',
        currency: establishment.currency || 'NGN',
        address: establishment.address || '',
        phone: establishment.phone || '',
        color_theme: establishment.color_theme || 'light',
        color: establishment.color || '',
        wifi_pass: establishment.wifi_pass || '',
        can_make_orders: establishment.can_make_orders || false,
        google_maps_link: establishment.google_maps_link || '',
        tiktok: establishment.tiktok || '',
        instagram: establishment.instagram || '',
        facebook: establishment.facebook || '',
        twitter: establishment.twitter || '',
        api_endpoint: establishment.api_endpoint || '',
        api_key: establishment.api_key || '',
        _method: 'PUT'
    });

    const [logoPreview, setLogoPreview] = useState(establishment.logo  ? `/storage/${establishment.logo}` : null);
    const [bgImagePreview, setBgImagePreview] = useState(establishment.bg_image ? `/storage/${establishment.bg_image}` : null);

    const handleCanMakeOrdersChange = (e) => {
        setData('can_make_orders', e.target.checked ? 1 : 0); // Convert to 1 or 0
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBgImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('bg_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBgImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        router.post(route('establishments.update', establishment.id), formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
        header="Edit Establishment"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white shadow-sm sm:rounded-lg p-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <Settings className="mr-3 text-indigo-600" /> 
                                    Basic Information
                                </h2>
                                
                                <div>
                                    <InputLabel htmlFor="name" value="Establishment Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="slug" value="Slug" />
                                    <TextInput
                                        id="slug"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contact & Location */}
                            <div className="space-y-4 bg-gray-50 p-6 rounded-lg border">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <MapPin className="mr-3 text-indigo-600" /> 
                                    Contact & Location
                                </h2>
                                
                                <div>
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextInput
                                        id="address"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone" value="Phone Number" />
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        className="mt-1 block w-full"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="google_maps_link" value="Google Maps Link" />
                                    <TextInput
                                        id="google_maps_link"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.google_maps_link}
                                        onChange={(e) => setData('google_maps_link', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visual & Branding */}
                        <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Palette className="mr-3 text-indigo-600" /> 
                                Visual & Branding
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel value="Logo" />
                                    <div className="mt-2 flex items-center">
                                        {logoPreview ? (
                                            <img 
                                                src={logoPreview} 
                                                alt="Logo Preview" 
                                                className="h-24 w-24 object-cover rounded-lg mr-4" 
                                            />
                                        ) : null}
                                        <label className="block">
                                            <span className="sr-only">Choose logo file</span>
                                            <input
                                                type="file"
                                                className="block w-full text-sm text-slate-500
                                                    file:mr-4 file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                                onChange={handleLogoUpload}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <InputLabel value="Background Image" />
                                    <div className="mt-2 flex items-center">
                                        {bgImagePreview ? (
                                            <img 
                                                src={bgImagePreview} 
                                                alt="Background Preview" 
                                                className="h-24 w-24 object-cover rounded-lg mr-4" 
                                            />
                                        ) : null}
                                        <label className="block">
                                            <span className="sr-only">Choose background image</span>
                                            <input
                                                type="file"
                                                className="block w-full text-sm text-slate-500
                                                    file:mr-4 file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                                onChange={handleBgImageUpload}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel htmlFor="color_theme" value="Color Theme" />
                                    <select
                                        id="color_theme"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.color_theme}
                                        onChange={(e) => setData('color_theme', e.target.value)}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="color" value="Accent Color" />
                                    <input
                                        id="color"
                                        type="color"
                                        className="mt-1 block w-full h-10 p-1 border-gray-300 rounded-md"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="currency" value="Currency" />
                                    <TextInput
                                        id="currency"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.currency}
                                        onChange={(e) => setData('currency', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Online & Connectivity */}
                        <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Globe className="mr-3 text-indigo-600" /> 
                                Online & Connectivity
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="wifi_pass" value="WiFi Password" />
                                    <div className="relative">
                                        <TextInput
                                            id="wifi_pass"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.wifi_pass}
                                            onChange={(e) => setData('wifi_pass', e.target.value)}
                                        />
                                        <Wifi className="absolute right-3 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="can_make_orders"
                                            checked={data.can_make_orders}
                                            onChange={handleCanMakeOrdersChange}
                                        />
                                        <label htmlFor="can_make_orders" className="ml-2 block text-sm text-gray-900">
                                            Enable Online Orders
                                            <ShoppingCart className="inline ml-2 text-indigo-600" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Link2 className="mr-3 text-indigo-600" /> 
                                Social Media
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="instagram" value="Instagram" />
                                    <div className="relative">
                                        <TextInput
                                            id="instagram"
                                            type="text"
                                            className="mt-1 block w-full pl-8"
                                            value={data.instagram}
                                            onChange={(e) => setData('instagram', e.target.value)}
                                        />
                                        <Instagram className="absolute left-2 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="facebook" value="Facebook" />
                                    <div className="relative">
                                        <TextInput
                                            id="facebook"
                                            type="text"
                                            className="mt-1 block w-full pl-8"
                                            value={data.facebook}
                                            onChange={(e) => setData('facebook', e.target.value)}
                                        />
                                        <Facebook className="absolute left-2 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="twitter" value="Twitter/X" />
                                    <div className="relative">
                                        <TextInput
                                            id="twitter"
                                            type="text"
                                            className="mt-1 block w-full pl-8"
                                            value={data.twitter}
                                            onChange={(e) => setData('twitter', e.target.value)}
                                        />
                                        <Twitter className="absolute left-2 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="tiktok" value="TikTok" />
                                    <div className="relative">
                                        <TextInput
                                            id="tiktok"
                                            type="text"
                                            className="mt-1 block w-full pl-8"
                                            value={data.tiktok}
                                            onChange={(e) => setData('tiktok', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* API Integration */}
                        <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <Database className="mr-3 text-indigo-600" /> 
                                API Integration
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="api_endpoint" value="API Endpoint" />
                                    <div className="relative">
                                        <TextInput
                                            id="api_endpoint"
                                            type="url"
                                            className="mt-1 block w-full pl-8"
                                            value={data.api_endpoint}
                                            onChange={(e) => setData('api_endpoint', e.target.value)}
                                            placeholder="https://api.yourservice.com"
                                        />
                                        <Globe className="absolute left-2 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="api_key" value="API Key" />
                                    <div className="relative">
                                        <TextInput
                                            id="api_key"
                                            type="password"
                                            className="mt-1 block w-full pl-8"
                                            value={data.api_key}
                                            onChange={(e) => setData('api_key', e.target.value)}
                                            placeholder="Enter your API key"
                                        />
                                        <Key className="absolute left-2 top-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4">
                            <SecondaryButton type="button" onClick={() => router.get(route('establishments.index'))}>
                                Cancel
                            </SecondaryButton>
                            
                            <PrimaryButton type="submit">
                                Save Establishment
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}