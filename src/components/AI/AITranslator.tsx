
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import CustomCard from '../UI/CustomCard';
import CustomButton from '../UI/CustomButton';
import { Languages, Check, ArrowRight, Copy, RefreshCw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'he', name: 'Hebrew' },
];

// Sample translations for demo
const sampleTranslations = {
  coffee: {
    en: 'Coffee',
    es: 'Café',
    fr: 'Café',
    de: 'Kaffee',
    it: 'Caffè',
    ru: 'Кофе',
    zh: '咖啡',
    ja: 'コーヒー',
    ar: 'قهوة',
    he: 'קפה',
  },
  gift: {
    en: 'Gift',
    es: 'Regalo',
    fr: 'Cadeau',
    de: 'Geschenk',
    it: 'Regalo',
    ru: 'Подарок',
    zh: '礼物',
    ja: 'ギフト',
    ar: 'هدية',
    he: 'מתנה',
  },
  welcome: {
    en: 'Welcome to Coffee Connection',
    es: 'Bienvenido a Coffee Connection',
    fr: 'Bienvenue à Coffee Connection',
    de: 'Willkommen bei Coffee Connection',
    it: 'Benvenuto a Coffee Connection',
    ru: 'Добро пожаловать в Coffee Connection',
    zh: '欢迎来到咖啡连接',
    ja: 'コーヒーコネクションへようこそ',
    ar: 'مرحبًا بكم في كوفي كونكشن',
    he: 'ברוכים הבאים לחיבור קפה',
  },
  send_gift: {
    en: 'Send a coffee gift to a friend',
    es: 'Envía un regalo de café a un amigo',
    fr: 'Envoyez un cadeau de café à un ami',
    de: 'Senden Sie einem Freund ein Kaffeegeschenk',
    it: 'Invia un regalo di caffè a un amico',
    ru: 'Отправить кофейный подарок другу',
    zh: '给朋友送咖啡礼物',
    ja: '友達にコーヒーギフトを送る',
    ar: 'أرسل هدية قهوة لصديق',
    he: 'שלח מתנת קפה לחבר',
  },
};

// Custom demo translations with coffee terms
const getSimpleTranslation = (text: string, targetLang: string) => {
  // Exact matches for sample phrases
  for (const key of Object.keys(sampleTranslations)) {
    if (text.toLowerCase().includes(sampleTranslations[key].en.toLowerCase())) {
      return text.replace(
        new RegExp(sampleTranslations[key].en, 'i'), 
        sampleTranslations[key][targetLang]
      );
    }
  }
  
  // Simple word replacement for demo
  let translated = text;
  for (const key of Object.keys(sampleTranslations)) {
    if (translated.toLowerCase().includes(key)) {
      translated = translated.replace(
        new RegExp(key, 'gi'), 
        sampleTranslations[key][targetLang]
      );
    }
  }
  
  // If no matches, append a note for the demo
  if (translated === text) {
    return `${text} [translated to ${languages.find(l => l.code === targetLang)?.name}]`;
  }
  
  return translated;
};

const AITranslator = () => {
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState([
    { id: 1, source: 'Welcome to Coffee Connection', target: 'Bienvenido a Coffee Connection', from: 'en', to: 'es' },
    { id: 2, source: 'Send a coffee gift', target: 'Envía un regalo de café', from: 'en', to: 'es' },
  ]);
  
  // Handle translation
  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast({
        title: "Missing Text",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }
    
    setIsTranslating(true);
    
    // Simulate API call
    setTimeout(() => {
      const translatedResult = getSimpleTranslation(sourceText, targetLang);
      setTranslatedText(translatedResult);
      
      // Add to recent translations
      const newTranslation = {
        id: Date.now(),
        source: sourceText,
        target: translatedResult,
        from: sourceLang,
        to: targetLang,
      };
      
      setRecentTranslations([newTranslation, ...recentTranslations.slice(0, 4)]);
      setIsTranslating(false);
    }, 1500);
  };
  
  // Copy translation to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied",
        description: "Translation copied to clipboard.",
      });
    });
  };
  
  // Swap languages
  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    
    // Also swap texts if there's a translation
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText('');
    }
  };
  
  return (
    <div className="space-y-6">
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>AI Translation Tool</CustomCard.Title>
          <CustomCard.Description>
            Translate campaign content, messages, and promotional materials into multiple languages.
          </CustomCard.Description>
        </CustomCard.Header>
        <CustomCard.Content className="p-6">
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-2/5">
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center">
                <button 
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  onClick={swapLanguages}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              
              <div className="w-full md:w-2/5">
                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Translation Input/Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Source Text</label>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setSourceText('')}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <Textarea 
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="min-h-[200px] resize-none"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Translated Text</label>
                  {translatedText && (
                    <button 
                      className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                      onClick={() => copyToClipboard(translatedText)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  )}
                </div>
                <Textarea 
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="min-h-[200px] resize-none bg-muted/30"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <CustomButton
                variant="primary"
                onClick={handleTranslate}
                disabled={isTranslating || !sourceText.trim()}
                icon={isTranslating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </CustomButton>
            </div>
            
            {/* Translation Suggestions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Common Coffee-Related Phrases</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(sampleTranslations).map((key) => (
                  <Badge 
                    key={key}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => setSourceText(sampleTranslations[key].en)}
                  >
                    {sampleTranslations[key].en}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CustomCard.Content>
      </CustomCard>
      
      {/* Recent Translations */}
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>Recent Translations</CustomCard.Title>
          <CustomCard.Description>
            Quick access to your previous translations
          </CustomCard.Description>
        </CustomCard.Header>
        <CustomCard.Content>
          {recentTranslations.length > 0 ? (
            <div className="divide-y divide-border">
              {recentTranslations.map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">
                        {languages.find(l => l.code === item.from)?.name} → {languages.find(l => l.code === item.to)?.name}
                      </span>
                    </div>
                    <button
                      className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                      onClick={() => copyToClipboard(item.target)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.source}</p>
                  <p className="text-sm font-medium">{item.target}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No recent translations
            </div>
          )}
        </CustomCard.Content>
      </CustomCard>
    </div>
  );
};

export default AITranslator;
