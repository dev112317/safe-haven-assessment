# Local Development Setup

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `env.example` to `.env.local`
   - Fill in your API keys (optional for basic testing)

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Go to `http://localhost:3000`
   - You'll be redirected to the ZIP code entry page

## What Works Now

✅ **Core Flow**:
- ZIP code entry page (`/zip-router`)
- Brand routing based on ZIP codes
- Brand-specific pages with different colors/phone numbers
- Lead form with basic validation
- Weather widget (if API key provided)

✅ **Supported ZIP Codes**:
- North Carolina: 28xxx → SafeHaven Security
- Florida: 32xxx, 33xxx, 34xxx → BestSecurity FL  
- Georgia: 30xxx, 31xxx → TopSecurity GA

## Testing the Application

1. **Test ZIP Routing**:
   - Enter `28201` (NC) → Should go to SafeHaven
   - Enter `33101` (FL) → Should go to BestSecurity
   - Enter `30301` (GA) → Should go to TopSecurity
   - Enter `10001` (NY) → Should show "we do not serve your area"

2. **Test Brand Pages**:
   - Each brand has different colors and phone numbers
   - Lead form should work (shows alert for now)
   - Weather widget works if API key is provided

## Optional API Keys

- **Google Maps**: For address autocomplete in the lead form
- **OpenWeather**: For weather information display

Without these keys, the features will gracefully degrade (no autocomplete, no weather).

## Next Steps

1. Test the basic flow
2. Add real API keys if needed
3. Customize UI/UX as needed
4. Integrate with real CRM when ready 