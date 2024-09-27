const days: string[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const months: string[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const LOCALE: string = "locale";
const DEFAULT_LOCALE: string = "nl";
const nl: string = "nl";
const NL: string = "NL";
const en: string = "en";
const EN: string = "EN";
const allowedLocales = [DEFAULT_LOCALE, en];
const SUBSCRIPTION_DETAILS = "subscriptionDetails";

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const USER: string = "user";
const TRIPS: string = "trips";
const AUTH: string = "auth";
const SESSION: string = "session";
const PROVIDER: string = "provider";
const VEHICLES: string = "vehicles";
const MODALITIES: string = "modalities";
const PROFILE: string = "profile";
const ADDRESS: string = "addresses";
const SUBSCRIPTIONS: string = "subscriptions";
const regEx = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  licensePlate:
    /^(?!.*--)(?!.*-.*-.*-)(?!^-)(?!-$)[A-Za-z0-9]+(?:-[A-Za-z0-9]+){0,2}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~€^\(\)\-_=+\[\]{};:'"\\|<>\/`])[A-Za-z\d@$!%*?&#~€^\(\)\-_=+\[\]{};:'"\\|<>\/`]{8,}$/,
  allowNumbers: /^-?\d+$/,
};
enum errorMessages {
  field_required = "field_required",
  invalid_email = "invalid_email",
  email_exists = "email_exists",
  password_length = "password_length",
  password_validation = "password_validation",
  password_match = "password_match",
  invalid_vehicle_name = "invalid_vehicle_name",
  invalidco2_g_km_tailpipe = "invalidco2_g_km_tailpipe",
  invalid_license_plate = "invalid_license_plate",
  error_while_updating_data = "error_while_updating_data",
  invalid_otp = "invalid_otp",
  agree_to_terms_of_use = "agree_to_terms_of_use",
  something_went_wrong = "something_went_wrong",
  "auth/wrong-password" = "auth_wrong_password",
  "auth/user-disabled" = "auth_user_disabled",
  "storage/object-not-found" = "storage_object_not_found",
  "auth/email-already-in-use" = "email_already_in_use",
  "auth/cancelled-popup-request" = "cancelled_popup_request",
  "auth/internal-error" = "internal_error",
  "auth/invalid-oauth-provider" = "invalid_oauth_provider",
  "auth/invalid-provider-id" = "invalid_provider_id",
  "auth/popup-blocked" = "popup_blocked",
  "auth/popup-closed-by-user" = "popup_closed_by_user",
  "auth/provider-already-linked" = "provider_already_linked",
  "auth/user-not-found" = "user_not_found",
  "please_verify_your_email" = "please_verify_your_email",
  "enter_valid_text" = "enter_valid_text",
  "allow_only_numbers" = "allow_only_numbers",
  "greater_than_one" = "greater_than_one",
}

enum successMessages {
  wfo_is_marked = "wfo_is_marked",
  wfh_is_marked = "wfh_is_marked",
  wfo_is_unmarked = "wfo_is_unmarked",
  wfh_is_unmarked = "wfh_is_unmarked",
  trip_updated_successfully = "trip_updated_successfully",
  trip_added_successfully = "trip_added_successfully",
  trip_deleted_successfully = "trip_deleted_successfully",
  vehicle_added_successfully = "vehicle_added_successfully",
  vehicle_deleted_successfully = "vehicle_deleted_successfully",
  vehicle_priority_updated_successfully = "vehicle_priority_updated_successfully",
  profile_updated_successfully = "profile_updated_successfully",
  default_vehicle_add = "default_vehicle_add",
  user_default_address_set_successfully = "user_default_address_set_successfully",
  reset_email_is_sent = "reset_email_is_sent",
  expense_report_submitted = "expense_report_submitted",
  wpm_report_submitted = "wpm_report_submitted",
}

enum warningMessages {
  please_add_vehicle = "please_add_vehicle",
  no_data_available = "no_data_available",
  unsupported_file_format = "unsupported_file_format",
  wfh_already_selected = "wfh_already_selected",
  wfo_already_selected = "wfo_already_selected",
  cannot_mark_weekend_days = "cannot_mark_weekend_days",
  cannot_addtrips_on_weekend_days = "cannot_addtrips_on_weekend_days",
  cannot_submit_current_month = "cannot_submit_current_month",
  submit_expense_validation = "submit_expense_validation",
}
const defaultTermsAndConditionLinks = {
  en: "https://fynchmobility.com/en/terms-and-conditions/",
  nl: "https://fynchmobility.com/algemene-voorwaarden/",
};
const defaultTermsOfUseLinks = {
  en: "https://fynchmobility.com/en/terms-of-use/",
  nl: "https://fynchmobility.com/gebruiksvoorwaarden/",
};
const defaultSupportLinks = {
  en: "https://fynchmobility.com/en/faq/",
  nl: "https://fynchmobility.com/faq/",
};
const defaultContactLink = "https://fynchmobility.com/gebruiksvoorwaarden/";
const clientName = process?.env?.NEXT_PUBLIC_CLIENT_NAME || "qa";
const loginScreenBgImage =
  process?.env?.NEXT_PUBLIC_LOGIN_SCREEN_BG_IMAGE ||
  `/${clientName}/assets/background-login-screen.png`;
const sidebarBgImage =
  process?.env?.NEXT_PUBLIC_SIDEBAR_MENU_BG_IMAGE ||
  `/${clientName}/assets/background-menu.png`;
const productLogo =
  process?.env?.NEXT_PUBLIC_PRODUCT_LOGO_IMAGE ||
  `/${clientName}/assets/productLogo.png`;
const productFavicon =
  process?.env?.NEXT_PUBLIC_PRODUCT_FAVICON ||
  `/${clientName}/favicon/favicon.png`;

const defaultRequireModalities = {
  2: [2, 9],
  3: [3, 10, 23, 24],
  21: [21, 22],
  11: [11, 12],
};
const allowedModalitiesForCarpool = [3, 10, 23, 24, 21, 22, 11, 12];

const getRequiredModalitiesFromEnv =
  process.env.NEXT_PUBLIC_ADD_DEFAULT_MODALITY_RESTRICTION;

const lastPathOfUrl = ["dashboard,my-vehicles,my-address"];
export {
  days,
  months,
  LOCALE,
  DEFAULT_LOCALE,
  nl,
  NL,
  en,
  EN,
  SUBSCRIPTION_DETAILS,
  API_URL,
  USER,
  TRIPS,
  AUTH,
  SESSION,
  PROVIDER,
  VEHICLES,
  MODALITIES,
  PROFILE,
  ADDRESS,
  SUBSCRIPTIONS,
  regEx,
  errorMessages,
  successMessages,
  warningMessages,
  allowedLocales,
  defaultTermsAndConditionLinks,
  defaultTermsOfUseLinks,
  defaultSupportLinks,
  defaultContactLink,
  loginScreenBgImage,
  sidebarBgImage,
  productLogo,
  productFavicon,
  defaultRequireModalities,
  getRequiredModalitiesFromEnv,
  allowedModalitiesForCarpool,
  lastPathOfUrl,
};
