import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { niveis } from 'App/utils/utils';

export default class extends BaseSchema {
  protected tableName = 'tese';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_bibliografia').references('bibliografias.id_bibliografia');
      table.enum('grau', niveis);
      table.string('nome_instituicao');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
