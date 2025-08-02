# Elråd - Oppdatert løsning

## Hva er nytt?
- Kun én knapp på forsiden ("SEND INN")
- Når skjema sendes:
  - Saksnummer genereres
  - AI-svar genereres via OpenAI
  - E-post sendes til kunden med saksnummer, AI-svar og en knapp for å få menneskelig hjelp
- Kontakt oss-siden har felt for Saksnummer (autofylles via URL)

## Miljøvariabler i Vercel
Legg inn disse i Settings -> Environment Variables:
- OPENAI_API_KEY = [din OpenAI-nøkkel]
- KV_REST_API_URL = [fra Upstash]
- KV_REST_API_TOKEN = [fra Upstash]
- EMAIL_USER = [din Gmail]
- EMAIL_PASS = [app-passord fra Gmail]

## Deploy
- Last opp alle filer til GitHub
- Redeploy i Vercel med "Clear Build Cache"
