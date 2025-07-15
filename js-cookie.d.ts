declare module "js-cookie" {
  interface CookiesStatic<T = {}> {
    get(name: string): string | undefined;
    getJSON(name: string): any;
    set(
      name: string,
      value: string | object,
      options?: Cookies.CookieAttributes
    ): void;
    remove(name: string, options?: Cookies.CookieAttributes): void;
    withConverter<TConv>(
      converter: Cookies.Converter<TConv>
    ): CookiesStatic<TConv>;
  }

  namespace Cookies {
    interface CookieAttributes {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    }

    interface Converter<T = {}> {
      read(value: string, name: string): string;
      write(value: string, name: string): string;
    }
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
