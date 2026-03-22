# Complete Homepage Management Guide

## Overview

The `/admin/homepage` interface provides full control over all homepage sections. All content is stored in MongoDB and can be edited without touching code.

---

## 📍 Sections Available for Management

### 1. Hero Section
### 2. Metrics Strip
### 3. Market Ticker API
### 4. Investment Case Section
### 5. Trusted Institutions
### 6. Final CTA Section

---

## 1. Hero Section

### Fields Available:
- **Eyebrow Text**: Small text above headline (e.g., "Energy Finance & Project Management")
- **Headline Line 1**: First line of main headline (e.g., "Structuring the")
- **Headline Line 2**: Second line with gradient effect (e.g., "Clean Energy Future")
- **Subheadline**: Descriptive paragraph below headline
- **Primary CTA Label**: Main button text (e.g., "Explore Our Portfolio")
- **Primary CTA Link**: URL for main button (e.g., "/portfolio")
- **Secondary CTA Label**: Secondary button text (e.g., "Investment Deck")
- **Secondary CTA Link**: URL for secondary button (e.g., "/contact")
- **Background Type**: Choose between Gradient, Image, or Video
- **Background Image**: Upload custom background (if Image selected)
- **Background Video**: Video URL (if Video selected)
- **Overlay Opacity**: Darkness of overlay (0-1)

### Best Practices:
- Keep headline concise and impactful
- Subheadline should be 1-2 sentences
- Use clear, action-oriented CTA labels

---

## 2. Metrics Strip

### Fields Available:
Three metrics, each with:
- **Value**: Numeric value (e.g., "12.4")
- **Suffix**: Unit or symbol (e.g., "B", " GW", "+")
- **Label**: Description (e.g., "Capital Deployed")

### Display Format:
```
[VALUE][SUFFIX]
[LABEL]
```

### Examples:
- 12.4B Capital Deployed
- 18.2 GW Capacity Managed
- 340+ Projects Closed

---

## 3. Market Ticker API

### Fields Available:
- **Alpha Vantage API Key**: API key for real-time market data

### Setup:
1. Get free API key at [alphavantage.co](https://www.alphavantage.co/support/#api-key)
2. Paste key in the field
3. Save changes
4. Market ticker will display live data

---

## 4. Investment Case Section ✨

### Overview:
Left side: Static content with headline and features
Right side: Tabbed content with metrics

### Fields Available:

#### Left Side Content:
- **Eyebrow Text**: Small label (e.g., "INVESTMENT CASE")
- **Headline**: Main headline (e.g., "Built for institutional capital at every stage.")
- **Body Text**: Descriptive paragraph
- **Features**: List of checkmark items (e.g., "Integrated PM + Finance model")

#### Right Side Tabs:
Each tab contains:
- **Tab ID**: Unique identifier (e.g., "track-record")
- **Tab Label**: Button text (e.g., "Track Record")
- **Title**: Tab content headline (e.g., "Proven Performance")
- **Content**: Tab description text
- **Metrics**: Array of label/value pairs

### Default Tabs:
1. **Track Record**
   - Net IRR Range: 8-12%
   - TVPI Range: 1.3x - 1.8x
   - Avg Hold Period: 7-10 years

2. **Risk Management**
   - PPA Coverage: 85%+
   - Counterparty Diversity: 40+ partners
   - Avg Credit Rating: A-/A3

3. **Pipeline**
   - Identified Opportunities: 45 GW
   - Active Development: 12 GW
   - Expected Deployment: $8B+ (3yr)

4. **ESG**
   - CO2 Avoided (Annual): 2.8M tonnes
   - GRESB Rating: 5-Star
   - UN PRI Signatory: Yes

### How to Edit:

#### Adding a Feature:
1. Click "+ Add Feature"
2. Enter feature text
3. Checkmark (✓) is added automatically

#### Editing a Tab:
1. Find the tab in the list
2. Update Tab ID, Label, Title, or Content
3. Add/remove metrics as needed

#### Adding a Metric to a Tab:
1. Click "+ Add Metric" within the tab
2. Enter Label (e.g., "NET IRR RANGE")
3. Enter Value (e.g., "8-12%")

#### Removing a Tab:
1. Click "Remove Tab" button
2. Save changes

---

## 5. Trusted Institutions ✨

### Overview:
Displays partner institutions and certifications

### Fields Available:

#### Section Settings:
- **Section Headline**: Main heading (e.g., "Trusted by leading institutions")

#### Institutions:
Each institution has:
- **Short Name**: Abbreviation displayed when no logo (e.g., "GS", "JPM")
- **Full Name**: Full institution name (e.g., "Goldman Sachs")
- **Logo**: Optional image upload
- **Order**: Automatic based on position

#### Certifications:
Each certification has:
- **Icon**: Emoji or symbol (e.g., ✓, ⭐, 🌍)
- **Label**: Certification name (e.g., "ISO 14001")
- **Order**: Automatic based on position

### Display Logic:
- **With Logo**: Shows logo image (grayscale, full color on hover)
- **Without Logo**: Shows short name text

### How to Edit:

#### Adding an Institution:
1. Click "+ Add Institution"
2. Enter Short Name (e.g., "MS")
3. Enter Full Name (e.g., "Morgan Stanley")
4. Optionally upload logo
5. Save changes

#### Uploading a Logo:
1. Click "Choose File"
2. Select image (PNG/JPG/SVG recommended)
3. Image uploads to Cloudinary automatically
4. URL is saved in database

#### Adding a Certification:
1. Click "+ Add Certification"
2. Enter Icon (emoji or symbol)
3. Enter Label
4. Save changes

### Logo Recommendations:
- Format: PNG with transparent background
- Size: 200x200px minimum
- Aspect Ratio: Square or horizontal
- File Size: Under 100KB

---

## 6. Final CTA Section ✨

### Overview:
Final call-to-action before footer with trust signals

### Fields Available:

#### Main Content:
- **Headline**: Main CTA headline (e.g., "Ready to deploy capital in the energy transition?")
- **Subheadline**: Supporting text paragraph

#### Buttons:
- **Primary CTA Label**: Main button text (e.g., "Schedule a Meeting")
- **Primary CTA Link**: URL for main button (e.g., "/contact")
- **Secondary CTA Label**: Secondary button text (e.g., "Download Investment Deck")
- **Secondary CTA Link**: URL for secondary button (e.g., "/deck.pdf")

#### Trust Signals:
Three trust signals displayed below buttons:
- **Trust Signal 1**: (e.g., "Typically responds within 24 hours")
- **Trust Signal 2**: (e.g., "NDA available upon request")
- **Trust Signal 3**: (e.g., "Strict confidentiality")

### Display Format:
```
[HEADLINE]
[SUBHEADLINE]

[PRIMARY BUTTON]  [SECONDARY BUTTON]

✓ [TRUST SIGNAL 1]  ✓ [TRUST SIGNAL 2]  ✓ [TRUST SIGNAL 3]
```

### How to Edit:
1. Update headline and subheadline
2. Modify button labels and links
3. Edit trust signals
4. Save changes

### Best Practices:
- Keep headline action-oriented
- Use clear, specific button labels
- Trust signals should be brief (5-8 words)
- Checkmarks (✓) are added automatically

---

## 🎯 General Workflow

### Making Changes:
1. Navigate to `/admin/homepage`
2. Scroll to the section you want to edit
3. Update fields as needed
4. Click "Save Changes" at the bottom
5. Refresh homepage to see updates

### Preview Changes:
- Click "Preview" button (top right) to open homepage in new tab
- Changes are saved immediately to database
- No deployment needed

### Reverting Changes:
- Check Audit Log at `/admin/audit-log`
- Contact admin to restore previous version if needed

---

## 🔧 Technical Details

### Database Schema:
All data stored in `Homepage` collection in MongoDB

### Components:
- **Server Components**: Fetch data from database
- **Client Components**: Handle animations and interactions
- **Admin Form**: Manages all content updates

### API Endpoint:
- **PUT /api/admin/homepage**: Updates all homepage content

### Authentication:
- Must be logged in as admin
- Changes are logged with admin email and timestamp

---

## 📊 Content Guidelines

### Writing Style:
- **Authoritative**: Confident, not boastful
- **Precise**: Numbers and facts over adjectives
- **Global**: International perspective

### Tone:
- Professional and institutional
- Data-driven
- Understated confidence

### Formatting:
- Use sentence case for most text
- ALL CAPS for metric labels
- Title Case for buttons and tabs

---

## 🚨 Troubleshooting

### Changes Not Appearing:
1. Ensure you clicked "Save Changes"
2. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
3. Check browser console for errors
4. Verify MongoDB connection

### Image Upload Issues:
1. Check file size (under 10MB)
2. Verify Cloudinary credentials in `.env.local`
3. Ensure file format is supported (PNG, JPG, SVG)

### API Key Not Working:
1. Verify key is valid at alphavantage.co
2. Check for extra spaces in the field
3. Ensure API key has proper permissions

---

## 📞 Support

For technical issues:
- Check audit log: `/admin/audit-log`
- Review CMS documentation
- Contact technical support

---

**Last Updated**: 2025
**Version**: 2.0
**Managed Sections**: 6/10 homepage sections
