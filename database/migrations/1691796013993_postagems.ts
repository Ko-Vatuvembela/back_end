import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { categorias } from 'App/utils/utils';
export default class extends BaseSchema {
  protected tableName = 'postagens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_postagem').unsigned().primary(),
        table.enum('categoria', categorias),
        table.integer('bibliografia_fk').references('bibliografias.id_bibliografia');
      table
        .integer('utilizador_fk')
        .unsigned()
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'),
        table
          .integer('lingua_fk')
          .unsigned()
          .references('linguas.id_lingua')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      table.text('conteudo');
      table.string('titulo');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
