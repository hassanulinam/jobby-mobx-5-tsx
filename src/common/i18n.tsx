import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init(
    {
      lng: "en",
      fallbackLng: "en",
      backend: {
        loadPath: "/i18n/translations/{{lng}}/{{ns}}.json",
      },
      ns: ["header", "home", "jobDetails", "jobFilters", "login", "failure"],
      defaultNS: "header",
      react: {
        useSuspense: true,
      },
    },
    (err) => {
      if (err) console.log("Error while loading i18n resources", err);
    }
  );

export default i18n;
