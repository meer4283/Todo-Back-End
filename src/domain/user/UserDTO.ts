import { MAGIC_LINK_DOMAIN } from '../../config';
import { urlParams } from '../../shared/constants';
// import isEmail from 'validator';
// import isEmpty from 'validator';
import { verifyMagicLink } from '../magicLink/MagicLinkConstants';
import { generateActivationToken } from '../magicLink/MagicLinkUtils';
import { AccountAccessTypeEnum } from './UserEntities';

class UserDTO {
  #user_id?: number | null;
  #email: string;
  #first_name: string;
  #last_name: string;
  #magic_link_activation_token: string;
  #account_access_type: string;
  #user_type?: string | null;
  #contract_status?: number | null;
  #create_time?: Date;
  #api_status?: number | null;
  #salt?: string | null;;;
  #password?: string | null;
  #mock_status?: number | null;
  #api_sign?: string | null;
  #remark?: string | null;
  #user_name?: string | null;
  constructor(data: Partial<UserDTO>) {
    this.#user_id = data.user_id;
    this.#email = data.email ?? '';
    this.#user_name = data.user_name ?? '';
    this.#first_name = data.first_name ?? '';
    this.#last_name = data.last_name ?? '';
    this.#magic_link_activation_token = data.magic_link_activation_token ?? '';
    this.#account_access_type =
      data.account_access_type ?? AccountAccessTypeEnum.password;

    this.#create_time = data.create_time || null;
    this.#api_status = data.api_status || null;
    this.#salt = data.salt  || null
    this.#password = data.password || null
    this.#mock_status = data.mock_status  || null
    this.#api_sign = data.api_sign || null;
    this.#remark = data.remark || null;
  }

  // Getters
  get user_id() {
    return this.#user_id;
  }
  get email() {
    return this.#email;
  }
  get user_name() {
    return this.#user_name;
  }
  get first_name() {
    return this.#first_name;
  }
  get last_name() {
    return this.#last_name;
  }
  get login_name() {
    return this.#first_name + ' ' + this.#last_name;
  }
  get magic_link_activation_token() {
    return this.#magic_link_activation_token;
  }
  get account_access_type() {
    return this.#account_access_type;
  }

  get user_type() {
    return this.#user_type;
  }

  get contract_status() {
    return this.#contract_status;
  }

  get create_time() {
    return this.#create_time;
  }

  get api_status() {
    return this.#api_status;
  }

  get api_sign() {
    return this.#api_sign;
  }
  get salt() {
    return this.#salt;
  }

  get password() {
    return this.#password;
  }

  get mock_status() {
    return this.#mock_status;
  }

  get remark() {
    return this.#remark;
  }

  // Methods
  setMagicLinkActivationToken() {
    if (!this.#magic_link_activation_token) {
      this.#magic_link_activation_token = generateActivationToken();
      this.#account_access_type = AccountAccessTypeEnum.magic;
    }
  }

  toJson() {
    return {
      user_id: this.#user_id,
      email: this.#email,
      first_name: this.#first_name,
      last_name: this.#last_name,
      contract_status: this.#contract_status,
      remark: this.#remark,
      account_access_type: this.#account_access_type,
   
    };
  }
  getMagicLinkUrl() {
    return `${MAGIC_LINK_DOMAIN}/plal?t=${encodeURIComponent(this.#magic_link_activation_token)}`
  }
  getMagicLinkActivationToken() {
    return `${this.#magic_link_activation_token}`
  }
  isValid() {
    return true
    // return (
    //   // isEmail(this.#email) &&
    //   // (!isEmpty(this.#first_name) || !isEmpty(this.#last_name))
    // );
  }

  getFullPasswordLessAccessUrl() {
    return verifyMagicLink.url
      .replace(urlParams.magicLinkDomain, MAGIC_LINK_DOMAIN)
      .replace(
        urlParams.token,
        encodeURIComponent(this.#magic_link_activation_token)
      );
  }
}

export default UserDTO;
