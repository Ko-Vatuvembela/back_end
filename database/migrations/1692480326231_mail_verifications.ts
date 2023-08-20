import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'mail_verifications';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('email', 45).primary();
      table.string('verification_code', 6);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
