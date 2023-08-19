import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'utilizador_fala_linguas';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('utilizador_fk', 40);
      table.string('lingua_fk', 64);

      table
        .foreign('utilizador_fk')
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('lingua_fk')
        .references('linguas.id_lingua')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
