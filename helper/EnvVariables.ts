class EnvVariables {
  private readonly _accountSid: string;
  private readonly _authToken: string;
  private readonly _twilioPhone: string;
  private readonly _siteName: string;
  private readonly _reviewLink: string;
  private readonly _menuLink: string;
  private readonly _secretPin: string;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.validateEnvVariables(processEnv);

    this._accountSid = processEnv.TWILIO_ACCOUNT_SI as string;
    this._authToken = processEnv.TWILIO_AUTH_TOKEN as string;
    this._twilioPhone = processEnv.TWILIO_PHONE_NUMBER as string;
    this._siteName = processEnv.NEXT_PUBLIC_SITE_NAME as string;
    this._reviewLink = processEnv.REVIEW_LINK as string;
    this._menuLink = processEnv.NEXT_PUBLIC_MENU_LINK as string;
    this._secretPin = processEnv.SECRET_PIN as string;
  }

  public get accountSid() {
    return this._accountSid;
  }

  public get authToken() {
    return this._authToken;
  }

  public get twilioPhone() {
    return this._twilioPhone;
  }

  public get siteName() {
    return this._siteName;
  }

  public get reviewLink() {
    return this._reviewLink;
  }

  public get menuLink() {
    return this._menuLink;
  }

  public get secretPin() {
    return this._secretPin;
  }

  private validateEnvVariables(processEnv: NodeJS.ProcessEnv) {
    if (!processEnv.TWILIO_ACCOUNT_SI) {
      throw new Error('Enviroment variable TWILIO_ACCOUNT_SI missing');
    } else if (!processEnv.TWILIO_AUTH_TOKEN) {
      throw new Error('Enviroment variable TWILIO_AUTH_TOKEN missing');
    } else if (!processEnv.TWILIO_PHONE_NUMBER) {
      throw new Error('Enviroment variable TWILIO_PHONE_NUMBER missing');
    } else if (!processEnv.NEXT_PUBLIC_SITE_NAME) {
      throw new Error('Enviroment variable NEXT_PUBLIC_SITE_NAME missing');
    } else if (!processEnv.REVIEW_LINK) {
      throw new Error('Enviroment variable REVIEW_LINK missing');
    } else if (!processEnv.NEXT_PUBLIC_MENU_LINK) {
      throw new Error('Enviroment variable NEXT_PUBLIC_MENU_LINK missing');
    } else if (!processEnv.SECRET_PIN) {
      throw new Error('Enviroment variable SECRET_PIN missing');
    }
  }
}

export default EnvVariables;
