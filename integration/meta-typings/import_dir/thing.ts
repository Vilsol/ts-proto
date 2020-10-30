
export interface ImportedThing {
  createdAt: Date | undefined;
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

export const metaImportedThing: { [key in keyof ImportedThing]: MetaI | string } = {
  createdAt: {meta:'union', choices: [undefined, 'Date']} as MetaU,
};

export const protobufPackage = 'simple'
