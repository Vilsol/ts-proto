import { basicTypeName, detectMapType, isMessage, isRepeated, isWithinOneOf, TypeMap } from './types';
import SourceInfo from './sourceInfo';
import { Any, CodeBlock, InterfaceSpec, Member, Modifier, PropertySpec, TypeName, TypeNames, Union } from 'ts-poet';
import { maybeSnakeToCamel } from './case';
import { OneofOption, Options } from './main';
import { google } from '../build/pbjs';
import DescriptorProto = google.protobuf.DescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;

export function getMetaInterfaces() {
  return [
    InterfaceSpec.create('MetaI')
      .addModifiers(Modifier.EXPORT)
      .addProperty(
        PropertySpec.create(
          'meta',
          TypeNames.unionType(`'object'`, `'array'`, `'map'`, `'union'`),
          false,
          Modifier.READONLY
        )
      ),
    InterfaceSpec.create('MetaO')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaI'))
      .addProperty(PropertySpec.create('meta', TypeNames.anyType(`'object'`), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('type', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(PropertySpec.create('name', TypeNames.STRING, false, Modifier.READONLY)),
    InterfaceSpec.create('MetaA')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaI'))
      .addProperty(PropertySpec.create('meta', TypeNames.anyType(`'array'`), false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create('type', TypeNames.unionType('MetaI', TypeNames.STRING), false, Modifier.READONLY)
      ),
    InterfaceSpec.create('MetaM')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaI'))
      .addProperty(PropertySpec.create('meta', TypeNames.anyType(`'map'`), false, Modifier.READONLY))
      .addProperty(PropertySpec.create('key', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create('value', TypeNames.unionType('MetaI', TypeNames.STRING), false, Modifier.READONLY)
      ),
    InterfaceSpec.create('MetaU')
      .addModifiers(Modifier.EXPORT)
      .addSuperInterface(TypeNames.anyType('MetaI'))
      .addProperty(PropertySpec.create('meta', TypeNames.anyType(`'union'`), false, Modifier.READONLY))
      .addProperty(
        PropertySpec.create(
          'choices',
          TypeNames.arrayType(TypeNames.unionType('MetaI', TypeNames.STRING, TypeNames.UNDEFINED)),
          false,
          Modifier.READONLY
        )
      ),
    InterfaceSpec.create('MetaS')
      .addModifiers(Modifier.EXPORT)
      .addProperty(PropertySpec.create('request', TypeNames.STRING, false, Modifier.READONLY))
      .addProperty(PropertySpec.create('response', TypeNames.STRING, false, Modifier.READONLY)),
  ];
}

export function generateMetaTypings(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  options: Options
): PropertySpec {
  const metaTypings = PropertySpec.create(
    'meta' + fullName,
    TypeNames.anonymousType(new Member(`[key in keyof ${fullName}]`, TypeNames.unionType('MetaI', 'string'), false))
  ).addModifiers(Modifier.EXPORT, Modifier.CONST);

  let initialValue = CodeBlock.empty().beginHash();
  messageDesc.field.forEach((field) => {
    initialValue = initialValue.addHashEntry(
      maybeSnakeToCamel(field.name, options),
      toMetaType(typeMap, messageDesc, field, options)
    );
  });

  return metaTypings.initializerBlock(initialValue.endHash());
}

export function generateServiceMetaTypings(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): PropertySpec {
  const metaTypings = PropertySpec.create(
    'meta' + serviceDesc.name,
    TypeNames.anonymousType(new Member(`[key in keyof ${serviceDesc.name}]`, TypeNames.anyType('MetaS'), false))
  ).addModifiers(Modifier.EXPORT, Modifier.CONST);

  let initialValue = CodeBlock.empty().beginHash();

  serviceDesc.method.forEach((method) => {
    initialValue = initialValue.addHashEntry(
      method.name,
      `{request: '${method.outputType}', response: '${method.outputType}'} as MetaS`
    );
  });

  return metaTypings.initializerBlock(initialValue.endHash());
}

function toMetaType(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  options: Options
): string {
  const type = basicTypeName(typeMap, field, options, { keepValueType: false });
  const strType = metaTypeType(field, type);

  if (isRepeated(field)) {
    const mapType = detectMapType(typeMap, messageDesc, field, options);
    if (mapType) {
      let { keyType, valueType } = mapType;
      const value = metaTypeType(mapType.messageDesc.field[1], valueType);
      return `{meta:'map', key:'${keyType}', value:${value}} as MetaM`;
    }

    return `{meta:'array', type:${strType}} as MetaA`;
  }

  if (
    (!isWithinOneOf(field) && isMessage(field) && !options.useOptionals) ||
    (isWithinOneOf(field) && options.oneof === OneofOption.PROPERTIES) ||
    (isWithinOneOf(field) && field.proto3Optional)
  ) {
    return `{meta:'union', choices: [undefined, ${strType}]} as MetaU`;
  }

  return strType;
}

function metaTypeType(field: FieldDescriptorProto, type: TypeName): string {
  if (type instanceof Union) {
    let resultString = '';
    type.typeChoices.forEach((choice) => {
      if (resultString !== '') {
        resultString += ', ';
      }

      resultString += `'${choice.toString()}'`;
    });
    return `{meta:'union', choices: [${resultString.toString()}]} as MetaU`;
  } else if (type instanceof Any && type.imported) {
    return `{meta:'object', type:'${field.typeName}', name:'${type.imported.value}'} as MetaO`;
  } else {
    switch (type.toString()) {
      case 'function':
      case 'undefined':
      case 'object':
      case 'symbol':
        break;
      default:
        return `'${type.toString()}'`;
    }
  }
  return type.toString();
}
