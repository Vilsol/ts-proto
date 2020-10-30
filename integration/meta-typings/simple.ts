//  Adding a comment to the syntax will become the first
//  comment in the output source file.
//
import { ImportedThing } from './import_dir/thing';
import { DateMessage } from './google/type/date';


/**
 * * Example comment on the Simple message  */
export interface Simple {
  /**
   *  Name field
   */
  name: string;
  /**
   *  Age  */
  age: number;
  /**
   *  This comment will also attach
   */
  createdAt: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
  snacks: string[];
  oldStates: StateEnum[];
  /**
   *  A thing (imported from thing)
   */
  thing: ImportedThing | undefined;
  blobs: Uint8Array[];
  birthday: DateMessage | undefined;
  blob: Uint8Array;
}

export interface Child {
  name: string;
  type: Child_Type;
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage | undefined;
  state: Nested_InnerEnum;
}

/**
 *  Comment for a nested message * /
 */
export interface Nested_InnerMessage {
  name: string;
  deep: Nested_InnerMessage_DeepMessage | undefined;
}

export interface Nested_InnerMessage_DeepMessage {
  name: string;
}

export interface OneOfMessage {
  first: string | undefined;
  last: string | undefined;
}

export interface SimpleWithWrappers {
  name: string | undefined;
  age: number | undefined;
  enabled: boolean | undefined;
  coins: number[];
  snacks: string[];
}

export interface Entity {
  id: number;
}

export interface SimpleWithMap {
  entitiesById: { [key: number]: Entity };
  nameLookup: { [key: string]: string };
  intLookup: { [key: number]: number };
  mapOfTimestamps: { [key: string]: Date };
  mapOfBytes: { [key: string]: Uint8Array };
}

export interface SimpleWithMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMap_NameLookupEntry {
  key: string;
  value: string;
}

export interface SimpleWithMap_IntLookupEntry {
  key: number;
  value: number;
}

export interface SimpleWithMap_MapOfTimestampsEntry {
  key: string;
  value: Date | undefined;
}

export interface SimpleWithMap_MapOfBytesEntry {
  key: string;
  value: Uint8Array;
}

export interface SimpleWithSnakeCaseMap {
  entitiesById: { [key: number]: Entity };
}

export interface SimpleWithSnakeCaseMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMapOfEnums {
  enumsById: { [key: number]: StateEnum };
}

export interface SimpleWithMapOfEnums_EnumsByIdEntry {
  key: number;
  value: StateEnum;
}

export interface PingRequest {
  input: string;
}

export interface PingResponse {
  output: string;
}

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: number;
  uint32: number;
  uint64: number;
  sint32: number;
  sint64: number;
  fixed32: number;
  fixed64: number;
  sfixed32: number;
  sfixed64: number;
}

/**
 * * For testing proto3's field presence feature.  */
export interface SimpleButOptional {
  /**
   *  Name field
   */
  name?: string | undefined;
  /**
   *  Age  */
  age?: number | undefined;
  /**
   *  This comment will also attach
   */
  createdAt?: Date | undefined;
  child?: Child | undefined;
  state?: StateEnum | undefined;
  /**
   *  A thing (imported from thing)
   */
  thing?: ImportedThing | undefined;
  birthday?: DateMessage | undefined;
}

export interface Empty {
}

export interface PingService {

  ping(request: PingRequest): Promise<PingResponse>;

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

export const metaSimple: { [key in keyof Simple]: MetaI | string } = {
  name: 'string',
  age: 'number',
  createdAt: {meta:'union', choices: [undefined, 'Date']} as MetaU,
  child: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Child', name:'Child'} as MetaO]} as MetaU,
  state: {meta:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaO,
  grandChildren: {meta:'array', type:{meta:'object', type:'.simple.Child', name:'Child'} as MetaO} as MetaA,
  coins: {meta:'array', type:'number'} as MetaA,
  snacks: {meta:'array', type:'string'} as MetaA,
  oldStates: {meta:'array', type:{meta:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaO} as MetaA,
  thing: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.ImportedThing', name:'ImportedThing'} as MetaO]} as MetaU,
  blobs: {meta:'array', type:'Uint8Array'} as MetaA,
  birthday: {meta:'union', choices: [undefined, {meta:'object', type:'.google.type.Date', name:'DateMessage'} as MetaO]} as MetaU,
  blob: 'Uint8Array',
};

export const metaChild: { [key in keyof Child]: MetaI | string } = {
  name: 'string',
  type: {meta:'object', type:'.simple.Child.Type', name:'Child_Type'} as MetaO,
};

export const metaNested: { [key in keyof Nested]: MetaI | string } = {
  name: 'string',
  message: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Nested.InnerMessage', name:'Nested_InnerMessage'} as MetaO]} as MetaU,
  state: {meta:'object', type:'.simple.Nested.InnerEnum', name:'Nested_InnerEnum'} as MetaO,
};

export const metaNested_InnerMessage: { [key in keyof Nested_InnerMessage]: MetaI | string } = {
  name: 'string',
  deep: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Nested.InnerMessage.DeepMessage', name:'Nested_InnerMessage_DeepMessage'} as MetaO]} as MetaU,
};

export const metaNested_InnerMessage_DeepMessage: { [key in keyof Nested_InnerMessage_DeepMessage]: MetaI | string } = {
  name: 'string',
};

export const metaOneOfMessage: { [key in keyof OneOfMessage]: MetaI | string } = {
  first: {meta:'union', choices: [undefined, 'string']} as MetaU,
  last: {meta:'union', choices: [undefined, 'string']} as MetaU,
};

export const metaSimpleWithWrappers: { [key in keyof SimpleWithWrappers]: MetaI | string } = {
  name: {meta:'union', choices: [undefined, {meta:'union', choices: ['string', 'undefined']} as MetaU]} as MetaU,
  age: {meta:'union', choices: [undefined, {meta:'union', choices: ['number', 'undefined']} as MetaU]} as MetaU,
  enabled: {meta:'union', choices: [undefined, {meta:'union', choices: ['boolean', 'undefined']} as MetaU]} as MetaU,
  coins: {meta:'array', type:'number'} as MetaA,
  snacks: {meta:'array', type:'string'} as MetaA,
};

export const metaEntity: { [key in keyof Entity]: MetaI | string } = {
  id: 'number',
};

export const metaSimpleWithMap: { [key in keyof SimpleWithMap]: MetaI | string } = {
  entitiesById: {meta:'map', key:'number', value:{meta:'object', type:'.simple.Entity', name:'Entity'} as MetaO} as MetaM,
  nameLookup: {meta:'map', key:'string', value:'string'} as MetaM,
  intLookup: {meta:'map', key:'number', value:'number'} as MetaM,
  mapOfTimestamps: {meta:'map', key:'string', value:'Date'} as MetaM,
  mapOfBytes: {meta:'map', key:'string', value:'Uint8Array'} as MetaM,
};

export const metaSimpleWithMap_EntitiesByIdEntry: { [key in keyof SimpleWithMap_EntitiesByIdEntry]: MetaI | string } = {
  key: 'number',
  value: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Entity', name:'Entity'} as MetaO]} as MetaU,
};

export const metaSimpleWithMap_NameLookupEntry: { [key in keyof SimpleWithMap_NameLookupEntry]: MetaI | string } = {
  key: 'string',
  value: 'string',
};

export const metaSimpleWithMap_IntLookupEntry: { [key in keyof SimpleWithMap_IntLookupEntry]: MetaI | string } = {
  key: 'number',
  value: 'number',
};

export const metaSimpleWithMap_MapOfTimestampsEntry: { [key in keyof SimpleWithMap_MapOfTimestampsEntry]: MetaI | string } = {
  key: 'string',
  value: {meta:'union', choices: [undefined, 'Date']} as MetaU,
};

export const metaSimpleWithMap_MapOfBytesEntry: { [key in keyof SimpleWithMap_MapOfBytesEntry]: MetaI | string } = {
  key: 'string',
  value: 'Uint8Array',
};

export const metaSimpleWithSnakeCaseMap: { [key in keyof SimpleWithSnakeCaseMap]: MetaI | string } = {
  entitiesById: {meta:'map', key:'number', value:{meta:'object', type:'.simple.Entity', name:'Entity'} as MetaO} as MetaM,
};

export const metaSimpleWithSnakeCaseMap_EntitiesByIdEntry: { [key in keyof SimpleWithSnakeCaseMap_EntitiesByIdEntry]: MetaI | string } = {
  key: 'number',
  value: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Entity', name:'Entity'} as MetaO]} as MetaU,
};

export const metaSimpleWithMapOfEnums: { [key in keyof SimpleWithMapOfEnums]: MetaI | string } = {
  enumsById: {meta:'map', key:'number', value:{meta:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaO} as MetaM,
};

export const metaSimpleWithMapOfEnums_EnumsByIdEntry: { [key in keyof SimpleWithMapOfEnums_EnumsByIdEntry]: MetaI | string } = {
  key: 'number',
  value: {meta:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaO,
};

export const metaPingRequest: { [key in keyof PingRequest]: MetaI | string } = {
  input: 'string',
};

export const metaPingResponse: { [key in keyof PingResponse]: MetaI | string } = {
  output: 'string',
};

export const metaNumbers: { [key in keyof Numbers]: MetaI | string } = {
  double: 'number',
  float: 'number',
  int32: 'number',
  int64: 'number',
  uint32: 'number',
  uint64: 'number',
  sint32: 'number',
  sint64: 'number',
  fixed32: 'number',
  fixed64: 'number',
  sfixed32: 'number',
  sfixed64: 'number',
};

export const metaSimpleButOptional: { [key in keyof SimpleButOptional]: MetaI | string } = {
  name: {meta:'union', choices: [undefined, 'string']} as MetaU,
  age: {meta:'union', choices: [undefined, 'number']} as MetaU,
  createdAt: {meta:'union', choices: [undefined, 'Date']} as MetaU,
  child: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.Child', name:'Child'} as MetaO]} as MetaU,
  state: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaO]} as MetaU,
  thing: {meta:'union', choices: [undefined, {meta:'object', type:'.simple.ImportedThing', name:'ImportedThing'} as MetaO]} as MetaU,
  birthday: {meta:'union', choices: [undefined, {meta:'object', type:'.google.type.Date', name:'DateMessage'} as MetaO]} as MetaU,
};

export const metaEmpty: { [key in keyof Empty]: MetaI | string } = {
};

export const metaPingService: { [key in keyof PingService]: MetaS } = {
  ping: {request: '.simple.PingResponse', response: '.simple.PingResponse'} as MetaS,
};

export const protobufPackage = 'simple'

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
  UNRECOGNIZED = -1,
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
  UNRECOGNIZED = -1,
}
