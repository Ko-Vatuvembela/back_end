import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'artigos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_bibliografia').references('bibliografias.id_bibliografia');
      table.string('numero_paginas');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
