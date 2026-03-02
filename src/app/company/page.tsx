'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  IconBuilding, 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconGlobe, 
  IconCamera, 
  IconUpload,
  IconSave,
  IconCheckCircle,
  IconAlertCircle
} from '@/components/Icons';

interface CompanyProfile {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
  description: string;
  industry: string;
  foundedYear: string;
  employeeCount: string;
}

export default function CompanyProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CompanyProfile>({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    website: '',
    description: '',
    industry: '',
    foundedYear: '',
    employeeCount: ''
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Consulting',
    'Marketing',
    'Other'
  ];

  const employeeCounts = [
    '1-10',
    '11-50',
    '51-100',
    '101-500',
    '501-1000',
    '1000+'
  ];

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please select an image file' }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'Image must be less than 2MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.logo;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field: keyof CompanyProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Invalid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store company data
    localStorage.setItem('companyProfile', JSON.stringify({
      ...formData,
      logo
    }));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F1419 0%, #1A1F26 50%, #0F1419 100%)',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '-20%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#F4F4F5',
              marginBottom: '4px'
            }}>
              Company Profile
            </h1>
            <p style={{ color: '#A1A1AA', fontSize: '14px' }}>
              Manage your company information and branding
            </p>
          </div>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#242B33',
              border: '1px solid #2D343F',
              borderRadius: '8px',
              color: '#A1A1AA',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10B981',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#10B981',
            animation: 'slideIn 0.3s ease'
          }}>
            <IconCheckCircle style={{ width: '20px', height: '20px' }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>
              Company profile saved successfully!
            </span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: '#1A1F26',
            border: '1px solid #2D343F',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            {/* Logo Upload Section */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F4F4F5',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <IconBuilding style={{ width: '18px', height: '18px', color: '#10B981' }} />
                Company Logo
              </h2>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap'
              }}>
                {/* Logo Preview */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  background: '#242B33',
                  border: `2px dashed ${errors.logo ? '#EF4444' : '#2D343F'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onClick={handleLogoClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10B981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = errors.logo ? '#EF4444' : '#2D343F';
                }}
                >
                  {logo ? (
                    <img 
                      src={logo} 
                      alt="Company Logo" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#71717A'
                    }}>
                      <IconCamera style={{ width: '32px', height: '32px' }} />
                      <span style={{ fontSize: '11px' }}>Upload</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s ease'
                  }}
                  className="logo-overlay"
                  >
                    <IconUpload style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                </div>

                {/* Upload Info */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p style={{ color: '#A1A1AA', fontSize: '14px', marginBottom: '8px' }}>
                    Upload your company logo
                  </p>
                  <p style={{ color: '#71717A', fontSize: '12px', marginBottom: '12px' }}>
                    Recommended: 200x200px, PNG or JPG, max 2MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {errors.logo && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#EF4444',
                      fontSize: '12px'
                    }}>
                      <IconAlertCircle style={{ width: '14px', height: '14px' }} />
                      {errors.logo}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F4F4F5',
                marginBottom: '20px'
              }}>
                Basic Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Company Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Company Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#71717A'
                    }}>
                      <IconBuilding style={{ width: '18px', height: '18px' }} />
                    </div>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="Enter company name"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 44px',
                        background: '#242B33',
                        border: `1px solid ${errors.companyName ? '#EF4444' : '#2D343F'}`,
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#10B981';
                        e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.companyName ? '#EF4444' : '#2D343F';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.companyName && (
                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateField('industry', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#242B33',
                      border: '1px solid #2D343F',
                      borderRadius: '8px',
                      color: '#F4F4F5',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2D343F';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select industry</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Founded Year */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Founded Year
                  </label>
                  <input
                    type="text"
                    value={formData.foundedYear}
                    onChange={(e) => updateField('foundedYear', e.target.value)}
                    placeholder="e.g., 2020"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#242B33',
                      border: '1px solid #2D343F',
                      borderRadius: '8px',
                      color: '#F4F4F5',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2D343F';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Employee Count */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Number of Employees
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => updateField('employeeCount', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#242B33',
                      border: '1px solid #2D343F',
                      borderRadius: '8px',
                      color: '#F4F4F5',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2D343F';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select range</option>
                    {employeeCounts.map(count => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginTop: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#A1A1AA',
                  marginBottom: '8px'
                }}>
                  Company Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Tell us about your company..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#242B33',
                    border: '1px solid #2D343F',
                    borderRadius: '8px',
                    color: '#F4F4F5',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10B981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2D343F';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F4F4F5',
                marginBottom: '20px'
              }}>
                Contact Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Email */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Email Address *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#71717A'
                    }}>
                      <IconMail style={{ width: '18px', height: '18px' }} />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="company@example.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 44px',
                        background: '#242B33',
                        border: `1px solid ${errors.email ? '#EF4444' : '#2D343F'}`,
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#10B981';
                        e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email ? '#EF4444' : '#2D343F';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#71717A'
                    }}>
                      <IconPhone style={{ width: '18px', height: '18px' }} />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 44px',
                        background: '#242B33',
                        border: '1px solid #2D343F',
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#10B981';
                        e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#2D343F';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Website
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#71717A'
                    }}>
                      <IconGlobe style={{ width: '18px', height: '18px' }} />
                    </div>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://www.example.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 44px',
                        background: '#242B33',
                        border: `1px solid ${errors.website ? '#EF4444' : '#2D343F'}`,
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#10B981';
                        e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.website ? '#EF4444' : '#2D343F';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  {errors.website && (
                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>
                      {errors.website}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Street Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#71717A'
                    }}>
                      <IconMapPin style={{ width: '18px', height: '18px' }} />
                    </div>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder="123 Business St"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 44px',
                        background: '#242B33',
                        border: '1px solid #2D343F',
                        borderRadius: '8px',
                        color: '#F4F4F5',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#10B981';
                        e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#2D343F';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="San Francisco"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#242B33',
                      border: '1px solid #2D343F',
                      borderRadius: '8px',
                      color: '#F4F4F5',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2D343F';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Country */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#A1A1AA',
                    marginBottom: '8px'
                  }}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="United States"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#242B33',
                      border: '1px solid #2D343F',
                      borderRadius: '8px',
                      color: '#F4F4F5',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2D343F';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              background: isLoading ? '#059669' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Saving Profile...
              </>
            ) : (
              <>
                <IconSave style={{ width: '20px', height: '20px' }} />
                Save Company Profile
              </>
            )}
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        div:hover .logo-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
