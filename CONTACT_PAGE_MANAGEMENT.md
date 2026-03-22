# Contact Page Management Guide

## Overview

The `/admin/contact-page` interface provides complete control over all content on the Contact page. All text, contact information, and form settings can be managed without touching code.

---

## 📍 Access

Navigate to: `/admin/contact-page`

Preview changes: Click "Preview" button (opens `/contact` in new tab)

---

## 🎯 Sections Available for Management

### 1. Hero Section
### 2. Contact Methods
### 3. Contact Form Settings
### 4. Global Offices

---

## 1. Hero Section

### Fields Available:
- **Eyebrow Text**: Small label above headline (e.g., "Contact")
- **Headline Line 1**: First line of headline (e.g., "Get in")
- **Headline Line 2**: Second line with gradient (e.g., "Touch")
- **Subheadline**: Descriptive paragraph below headline

### Display Format:
```
[EYEBROW TEXT]

[HEADLINE LINE 1]
[HEADLINE LINE 2] (gradient effect)

[SUBHEADLINE]
```

### Best Practices:
- Keep eyebrow text short (1-2 words)
- Headline should be concise and welcoming
- Subheadline: 1-2 sentences explaining who should contact

---

## 2. Contact Methods

### Overview:
Three contact cards displayed in a grid

### Fields Per Contact Method:
- **Title**: Contact type (e.g., "General Inquiries")
- **Email**: Contact email address
- **Phone**: Contact phone number
- **Description**: Brief description of what this contact handles

### Display Format:
```
[TITLE]
[DESCRIPTION]

Email: [EMAIL]
Phone: [PHONE]
```

### How to Edit:

#### Adding a Contact Method:
1. Click "+ Add Contact Method"
2. Fill in all fields
3. Save changes

#### Editing a Contact Method:
1. Update any field
2. Save changes

#### Removing a Contact Method:
1. Click "Remove" button
2. Save changes

### Default Contact Methods:
1. **General Inquiries**
   - info@helioaegis.com
   - +1 (212) 555-0100

2. **Investor Relations**
   - investors@helioaegis.com
   - +1 (212) 555-0101

3. **Project Submissions**
   - projects@helioaegis.com
   - +1 (212) 555-0102

---

## 3. Contact Form Settings

### Overview:
Customize all text and options in the contact form

### Fields Available:

#### Form Header:
- **Form Headline**: Main form title (e.g., "Send us a Message")
- **Form Subheadline**: Text below headline (e.g., "We typically respond within 24 hours...")

#### Form Footer:
- **Response Time Text**: Small text at bottom of form
- **Privacy Checkbox Text**: Text for privacy agreement checkbox
- **Submit Button Text**: Button label (e.g., "Send Message")
- **Success Message**: Text shown after submission (e.g., "✓ Message Sent")

#### Inquiry Types:
Dropdown options for inquiry type field

Each inquiry type has:
- **Value**: Internal identifier (e.g., "general")
- **Label**: Display text (e.g., "General Inquiry")

### How to Edit:

#### Updating Form Text:
1. Edit any text field
2. Save changes

#### Adding an Inquiry Type:
1. Click "+ Add Inquiry Type"
2. Enter Value (lowercase, no spaces)
3. Enter Label (display text)
4. Save changes

#### Removing an Inquiry Type:
1. Click "×" button next to the type
2. Save changes

### Default Inquiry Types:
- General Inquiry
- Investor Relations
- Project Developer
- Partnership Opportunity
- Other

---

## 4. Global Offices

### Overview:
Display office locations worldwide

### Fields Per Office:
- **Region**: Geographic region (e.g., "North America")
- **Office**: City and country (e.g., "New York, USA")
- **Address**: Full street address
- **Phone**: Office phone number
- **Timezone**: Time zone abbreviation (e.g., "EST")

### Display Format:
```
[REGION]

Office: [OFFICE]
Address: [ADDRESS]
Phone: [PHONE]
Timezone: [TIMEZONE]
```

### How to Edit:

#### Adding an Office:
1. Click "+ Add Office"
2. Fill in all fields
3. Save changes

#### Editing an Office:
1. Update any field
2. Save changes

#### Removing an Office:
1. Click "Remove" button
2. Save changes

### Default Offices:

**North America**
- New York, USA
- 123 Park Avenue, New York, NY 10017
- +1 (212) 555-0100
- EST

**Europe**
- London, UK
- 456 Canary Wharf, London, E14 5AB
- +44 (20) 7946 0958
- GMT

**MENA**
- Dubai, UAE
- 789 DIFC, Dubai, UAE
- +971 (4) 362 1111
- GST

---

## 🎨 Design Preservation

### What's Preserved:
- All colors and gradients
- Font families and sizes
- Spacing and layout
- Card styles and borders
- Hover effects
- Animations
- Responsive breakpoints

### What's Editable:
- All text content
- Contact information
- Form labels and messages
- Inquiry type options
- Office locations

---

## 🔧 General Workflow

### Making Changes:
1. Navigate to `/admin/contact-page`
2. Edit any section
3. Click "Save Changes" at the bottom
4. Refresh `/contact` page to see updates

### Preview Changes:
- Click "Preview" button (top right)
- Opens contact page in new tab
- Changes are saved immediately

### Best Practices:
- Keep phone numbers in international format
- Use consistent email domain
- Verify all contact information is current
- Test form after making changes

---

## 📊 Content Guidelines

### Contact Information:
- Use professional email addresses
- Include country codes for phone numbers
- Keep descriptions brief (5-10 words)
- Verify all information is accurate

### Form Text:
- Be clear about response times
- Mention confidentiality/NDA availability
- Keep privacy text concise but complete
- Use action-oriented button text

### Office Information:
- Use full street addresses
- Include postal/zip codes
- Use standard timezone abbreviations
- Keep region names consistent

---

## 🚨 Troubleshooting

### Changes Not Appearing:
1. Ensure you clicked "Save Changes"
2. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
3. Check browser console for errors
4. Verify MongoDB connection

### Form Not Working:
1. Check all required fields are filled
2. Verify inquiry types have both value and label
3. Ensure privacy text is not empty
4. Check button text is set

### Contact Links Not Working:
1. Verify email format (no spaces)
2. Check phone format includes country code
3. Ensure mailto: and tel: links are generated correctly

---

## 📞 Support

For technical issues:
- Check audit log: `/admin/audit-log`
- Review CMS documentation
- Contact technical support

---

## 🔐 Security Notes

### Contact Information:
- All contact info is public on the website
- Use business contact details only
- Never include personal information
- Regularly review and update contact details

### Form Submissions:
- Form submissions are client-side only (demo)
- To enable real submissions, integrate with email service
- Consider adding CAPTCHA for spam protection
- Implement rate limiting for form submissions

---

**Last Updated**: 2025
**Version**: 1.0
**Managed Sections**: 4/4 contact page sections
