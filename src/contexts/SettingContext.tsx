import { createContext, FC, PropsWithChildren, useContext } from "react";
import useSWR from "swr";
import LoadingScreen from "components/LoadingScreen";
import { db_slug } from "utils/constants";

type ContextProps = {
  allLinks: any;
  topbarSetting: any;
  footerSetting: any;
  generalSetting: any;
};

const SettingContext = createContext<ContextProps>({
  allLinks: {},
  topbarSetting: {},
  footerSetting: {},
  generalSetting: {},
});

export const SettingProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data = [], isLoading } = useSWR<any[]>("/api/settings");

  // general site settings
  const generalSettings = data.find((item) => item.slug === db_slug.general_site_setting);
  // topbar settings
  const topbarSettings = data.find((item) => item.slug === db_slug.topbar_setting);
  // get all social links
  const allLinksSettings = data.find((item) => item.slug === db_slug.social_link);
  // footer content setting
  const footerSettings = data.find((item) => item.slug === db_slug.footer_setting);

  const readyAllData = () =>
    generalSettings && topbarSettings && allLinksSettings && footerSettings;

  if (isLoading || !data || !readyAllData()) return <LoadingScreen open />;

  const values = {
    allLinks: allLinksSettings?.values,
    topbarSetting: topbarSettings?.values,
    footerSetting: footerSettings?.values,
    generalSetting: generalSettings?.values,
  };

  return <SettingContext.Provider value={values}>{children}</SettingContext.Provider>;
};

export const useSettingContext = () => useContext<ContextProps>(SettingContext);

export default SettingContext;
