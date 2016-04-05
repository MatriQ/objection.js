import _ from 'lodash';
import jsonApi from './postgresJsonApi';
import QueryBuilderMethod from '../QueryBuilderMethod';

export default class WhereJsonFieldPostgresMethod extends QueryBuilderMethod {

  constructor(builder, name, opt) {
    super(builder, name, opt);
    /**
     * @type {string}
     */
    this.sql = null;
  }

  onCall(builder) {
    this.sql = jsonApi.whereJsonFieldQuery(builder.knex(), this.args[0], this.args[1], this.args[2]);
    return true;
  }

  onBuild(knexBuilder) {
    if (this.opt.bool === 'or') {
      knexBuilder.orWhereRaw(this.sql);
    } else {
      knexBuilder.whereRaw(this.sql);
    }
  }
}
