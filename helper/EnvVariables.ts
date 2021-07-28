class EnvVariables {
  private readonly _accountSid: string;
  private readonly _authToken: string;
  private readonly _twilioPhone: string;
  private readonly _siteName: string;
  private readonly _secretPin: string;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.validateEnvVariables(processEnv);

    this._accountSid = processEnv.TWILIO_ACCOUNT_SI as string;
    this._authToken = processEnv.TWILIO_AUTH_TOKEN as string;
    this._twilioPhone = processEnv.TWILIO_PHONE_NUMBER as string;
    this._siteName = processEnv.SITE_NAME as string;
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

  public get secretPin() {
    return this._secretPin;
  }

  private validateEnvVariables(processEnv: NodeJS.ProcessEnv) {
    if (
      !processEnv.TWILIO_ACCOUNT_SI ||
      !processEnv.TWILIO_AUTH_TOKEN ||
      !processEnv.TWILIO_PHONE_NUMBER ||
      !processEnv.SITE_NAME ||
      !processEnv.SECRET_PIN
    ) {
      throw new Error('Enviroment variables missing');
    }
  }
}

export default EnvVariables;
