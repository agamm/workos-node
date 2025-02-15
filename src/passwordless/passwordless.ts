import { WorkOS } from '../workos';
import { PasswordlessSession } from './interfaces/passwordless-session.interface';
import { CreatePasswordlessSessionOptions } from './interfaces/create-passwordless-session-options.interface';
import { SendSessionResponse } from './interfaces/send-session-response.interface';

export class Passwordless {
  constructor(private readonly workos: WorkOS) {}

  async createSession({
    redirectURI,
    expiresIn,
    ...options
  }: CreatePasswordlessSessionOptions): Promise<PasswordlessSession> {
    const { data } = await this.workos.post('/passwordless/sessions', {
      ...options,
      redirect_uri: redirectURI,
      expires_in: expiresIn,
    });
    return data;
  }

  async sendSession(sessionId: string): Promise<SendSessionResponse> {
    const { data } = await this.workos.post(
      `/passwordless/sessions/${sessionId}/send`,
      {},
    );
    return data;
  }
}
