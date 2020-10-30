
/**
 *  Wrapper message for `double`.
 *
 *  The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  /**
   *  The double value.
   */
  value: number;
}

/**
 *  Wrapper message for `float`.
 *
 *  The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  /**
   *  The float value.
   */
  value: number;
}

/**
 *  Wrapper message for `int64`.
 *
 *  The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  /**
   *  The int64 value.
   */
  value: number;
}

/**
 *  Wrapper message for `uint64`.
 *
 *  The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  /**
   *  The uint64 value.
   */
  value: number;
}

/**
 *  Wrapper message for `int32`.
 *
 *  The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  /**
   *  The int32 value.
   */
  value: number;
}

/**
 *  Wrapper message for `uint32`.
 *
 *  The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  /**
   *  The uint32 value.
   */
  value: number;
}

/**
 *  Wrapper message for `bool`.
 *
 *  The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  /**
   *  The bool value.
   */
  value: boolean;
}

/**
 *  Wrapper message for `string`.
 *
 *  The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  /**
   *  The string value.
   */
  value: string;
}

/**
 *  Wrapper message for `bytes`.
 *
 *  The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  /**
   *  The bytes value.
   */
  value: Uint8Array;
}

export interface MetaI {
  readonly meta: 'object' | 'array' | 'map' | 'union';
}

export interface MetaO extends MetaI {
  readonly meta: 'object';
  readonly type: string;
  readonly name: string;
}

export interface MetaA extends MetaI {
  readonly meta: 'array';
  readonly type: MetaI | string;
}

export interface MetaM extends MetaI {
  readonly meta: 'map';
  readonly key: string;
  readonly value: MetaI | string;
}

export interface MetaU extends MetaI {
  readonly meta: 'union';
  readonly choices: Array<MetaI | string | undefined>;
}

export interface MetaS {
  readonly request: string;
  readonly response: string;
}

export const metaDoubleValue: { [key in keyof DoubleValue]: MetaI | string } = {
  value: 'number',
};

export const metaFloatValue: { [key in keyof FloatValue]: MetaI | string } = {
  value: 'number',
};

export const metaInt64Value: { [key in keyof Int64Value]: MetaI | string } = {
  value: 'number',
};

export const metaUInt64Value: { [key in keyof UInt64Value]: MetaI | string } = {
  value: 'number',
};

export const metaInt32Value: { [key in keyof Int32Value]: MetaI | string } = {
  value: 'number',
};

export const metaUInt32Value: { [key in keyof UInt32Value]: MetaI | string } = {
  value: 'number',
};

export const metaBoolValue: { [key in keyof BoolValue]: MetaI | string } = {
  value: 'boolean',
};

export const metaStringValue: { [key in keyof StringValue]: MetaI | string } = {
  value: 'string',
};

export const metaBytesValue: { [key in keyof BytesValue]: MetaI | string } = {
  value: 'Uint8Array',
};

export const protobufPackage = 'google.protobuf'
