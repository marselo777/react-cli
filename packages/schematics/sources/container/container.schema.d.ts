/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ContainerOptions {
  /**
   * Имя контейнера
   */
  name: string;
  /**
   * Нужно ли генерировать Slice
   */
  slice?: boolean;
  /**
   * Нужно ли генерировать Epic
   */
  epic?: boolean;
  /**
   * Нужно ли генерировать тесты
   */
  spec?: boolean;
  [k: string]: unknown;
}