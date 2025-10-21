type SomeOf<T> = T[keyof T];

/** get /v1/email */
type GetV1EmailInput = {
  /** The email to send the email to */
  email: string;
};

/** get /v1/email */
type GetV1EmailPositiveVariant1 = {
  status: "success";
  data: {
    /** The message to send the email to */
    message: string;
  };
};

/** get /v1/email */
interface GetV1EmailPositiveResponseVariants {
  200: GetV1EmailPositiveVariant1;
}

/** get /v1/email */
type GetV1EmailNegativeVariant1 = {
  status: "error";
  error: {
    message: string;
  };
};

/** get /v1/email */
interface GetV1EmailNegativeResponseVariants {
  400: GetV1EmailNegativeVariant1;
}

/** head /v1/email */
type HeadV1EmailInput = {
  /** The email to send the email to */
  email: string;
};

/** head /v1/email */
type HeadV1EmailPositiveVariant1 = undefined;

/** head /v1/email */
interface HeadV1EmailPositiveResponseVariants {
  200: HeadV1EmailPositiveVariant1;
}

/** head /v1/email */
type HeadV1EmailNegativeVariant1 = undefined;

/** head /v1/email */
interface HeadV1EmailNegativeResponseVariants {
  400: HeadV1EmailNegativeVariant1;
}

/** post /v1/email */
type PostV1EmailInput = {};

/** post /v1/email */
type PostV1EmailPositiveVariant1 = {
  status: "success";
  data: {
    /** The message to send the email to */
    message: string;
  };
};

/** post /v1/email */
interface PostV1EmailPositiveResponseVariants {
  200: PostV1EmailPositiveVariant1;
}

/** post /v1/email */
type PostV1EmailNegativeVariant1 = {
  status: "error";
  error: {
    message: string;
  };
};

/** post /v1/email */
interface PostV1EmailNegativeResponseVariants {
  400: PostV1EmailNegativeVariant1;
}

export type Path = "/v1/email";

export type Method = "get" | "post" | "put" | "delete" | "patch" | "head";

export interface Input {
  "get /v1/email": GetV1EmailInput;
  "head /v1/email": HeadV1EmailInput;
  "post /v1/email": PostV1EmailInput;
}

export interface PositiveResponse {
  "get /v1/email": SomeOf<GetV1EmailPositiveResponseVariants>;
  "head /v1/email": SomeOf<HeadV1EmailPositiveResponseVariants>;
  "post /v1/email": SomeOf<PostV1EmailPositiveResponseVariants>;
}

export interface NegativeResponse {
  "get /v1/email": SomeOf<GetV1EmailNegativeResponseVariants>;
  "head /v1/email": SomeOf<HeadV1EmailNegativeResponseVariants>;
  "post /v1/email": SomeOf<PostV1EmailNegativeResponseVariants>;
}

export interface EncodedResponse {
  "get /v1/email": GetV1EmailPositiveResponseVariants &
    GetV1EmailNegativeResponseVariants;
  "head /v1/email": HeadV1EmailPositiveResponseVariants &
    HeadV1EmailNegativeResponseVariants;
  "post /v1/email": PostV1EmailPositiveResponseVariants &
    PostV1EmailNegativeResponseVariants;
}

export interface Response {
  "get /v1/email":
    | PositiveResponse["get /v1/email"]
    | NegativeResponse["get /v1/email"];
  "head /v1/email":
    | PositiveResponse["head /v1/email"]
    | NegativeResponse["head /v1/email"];
  "post /v1/email":
    | PositiveResponse["post /v1/email"]
    | NegativeResponse["post /v1/email"];
}

export type Request = keyof Input;
