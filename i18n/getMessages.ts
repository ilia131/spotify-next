import fa from "./messages/fa.json";
import en from "./messages/en.json";

import type { Locale } from "./config";

const messages = {
  fa,
  en,
};

export async function getMessages(locale: Locale) {
  return messages[locale];
}