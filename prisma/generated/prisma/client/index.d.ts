
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model StockMovement
 * 
 */
export type StockMovement = $Result.DefaultSelection<Prisma.$StockMovementPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model Remittance
 * 
 */
export type Remittance = $Result.DefaultSelection<Prisma.$RemittancePayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model BankTransaction
 * 
 */
export type BankTransaction = $Result.DefaultSelection<Prisma.$BankTransactionPayload>
/**
 * Model FounderLoanTransaction
 * 
 */
export type FounderLoanTransaction = $Result.DefaultSelection<Prisma.$FounderLoanTransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StockMovementType: {
  PURCHASE: 'PURCHASE',
  SALE: 'SALE',
  ADJUSTMENT: 'ADJUSTMENT',
  RETURN: 'RETURN',
  RESERVATION: 'RESERVATION',
  RESERVATION_RELEASE: 'RESERVATION_RELEASE'
};

export type StockMovementType = (typeof StockMovementType)[keyof typeof StockMovementType]


export const OrderType: {
  LEAD: 'LEAD',
  ORDER: 'ORDER'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]


export const OrderStatus: {
  PENDING: 'PENDING',
  NO_ANSWER: 'NO_ANSWER',
  CANCELLED: 'CANCELLED',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const PaymentStatus: {
  AWAITING_COLLECTION: 'AWAITING_COLLECTION',
  COLLECTED: 'COLLECTED',
  SETTLED: 'SETTLED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const ExpenseType: {
  MARKETING: 'MARKETING',
  SALARY: 'SALARY',
  RENT: 'RENT',
  SOFTWARE: 'SOFTWARE',
  LOGISTICS: 'LOGISTICS',
  TAX: 'TAX',
  OTHER: 'OTHER'
};

export type ExpenseType = (typeof ExpenseType)[keyof typeof ExpenseType]


export const BankTransactionType: {
  IN: 'IN',
  OUT: 'OUT'
};

export type BankTransactionType = (typeof BankTransactionType)[keyof typeof BankTransactionType]


export const FounderLoanType: {
  COMPANY_OWES_FOUNDER: 'COMPANY_OWES_FOUNDER',
  COMPANY_REPAID_FOUNDER: 'COMPANY_REPAID_FOUNDER'
};

export type FounderLoanType = (typeof FounderLoanType)[keyof typeof FounderLoanType]

}

export type StockMovementType = $Enums.StockMovementType

export const StockMovementType: typeof $Enums.StockMovementType

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type ExpenseType = $Enums.ExpenseType

export const ExpenseType: typeof $Enums.ExpenseType

export type BankTransactionType = $Enums.BankTransactionType

export const BankTransactionType: typeof $Enums.BankTransactionType

export type FounderLoanType = $Enums.FounderLoanType

export const FounderLoanType: typeof $Enums.FounderLoanType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Stocks
 * const stocks = await prisma.stock.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Stocks
   * const stocks = await prisma.stock.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockMovements
    * const stockMovements = await prisma.stockMovement.findMany()
    * ```
    */
  get stockMovement(): Prisma.StockMovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.remittance`: Exposes CRUD operations for the **Remittance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Remittances
    * const remittances = await prisma.remittance.findMany()
    * ```
    */
  get remittance(): Prisma.RemittanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bankTransaction`: Exposes CRUD operations for the **BankTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankTransactions
    * const bankTransactions = await prisma.bankTransaction.findMany()
    * ```
    */
  get bankTransaction(): Prisma.BankTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.founderLoanTransaction`: Exposes CRUD operations for the **FounderLoanTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FounderLoanTransactions
    * const founderLoanTransactions = await prisma.founderLoanTransaction.findMany()
    * ```
    */
  get founderLoanTransaction(): Prisma.FounderLoanTransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Stock: 'Stock',
    StockMovement: 'StockMovement',
    Order: 'Order',
    Remittance: 'Remittance',
    Expense: 'Expense',
    BankTransaction: 'BankTransaction',
    FounderLoanTransaction: 'FounderLoanTransaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "stock" | "stockMovement" | "order" | "remittance" | "expense" | "bankTransaction" | "founderLoanTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      StockMovement: {
        payload: Prisma.$StockMovementPayload<ExtArgs>
        fields: Prisma.StockMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findFirst: {
            args: Prisma.StockMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findMany: {
            args: Prisma.StockMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          create: {
            args: Prisma.StockMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          createMany: {
            args: Prisma.StockMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          delete: {
            args: Prisma.StockMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          update: {
            args: Prisma.StockMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          deleteMany: {
            args: Prisma.StockMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockMovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          upsert: {
            args: Prisma.StockMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          aggregate: {
            args: Prisma.StockMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockMovement>
          }
          groupBy: {
            args: Prisma.StockMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockMovementCountArgs<ExtArgs>
            result: $Utils.Optional<StockMovementCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      Remittance: {
        payload: Prisma.$RemittancePayload<ExtArgs>
        fields: Prisma.RemittanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RemittanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RemittanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          findFirst: {
            args: Prisma.RemittanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RemittanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          findMany: {
            args: Prisma.RemittanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>[]
          }
          create: {
            args: Prisma.RemittanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          createMany: {
            args: Prisma.RemittanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RemittanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>[]
          }
          delete: {
            args: Prisma.RemittanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          update: {
            args: Prisma.RemittanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          deleteMany: {
            args: Prisma.RemittanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RemittanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RemittanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>[]
          }
          upsert: {
            args: Prisma.RemittanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemittancePayload>
          }
          aggregate: {
            args: Prisma.RemittanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRemittance>
          }
          groupBy: {
            args: Prisma.RemittanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<RemittanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.RemittanceCountArgs<ExtArgs>
            result: $Utils.Optional<RemittanceCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      BankTransaction: {
        payload: Prisma.$BankTransactionPayload<ExtArgs>
        fields: Prisma.BankTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          findFirst: {
            args: Prisma.BankTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          findMany: {
            args: Prisma.BankTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>[]
          }
          create: {
            args: Prisma.BankTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          createMany: {
            args: Prisma.BankTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>[]
          }
          delete: {
            args: Prisma.BankTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          update: {
            args: Prisma.BankTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          deleteMany: {
            args: Prisma.BankTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BankTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>[]
          }
          upsert: {
            args: Prisma.BankTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankTransactionPayload>
          }
          aggregate: {
            args: Prisma.BankTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankTransaction>
          }
          groupBy: {
            args: Prisma.BankTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<BankTransactionCountAggregateOutputType> | number
          }
        }
      }
      FounderLoanTransaction: {
        payload: Prisma.$FounderLoanTransactionPayload<ExtArgs>
        fields: Prisma.FounderLoanTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FounderLoanTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FounderLoanTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          findFirst: {
            args: Prisma.FounderLoanTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FounderLoanTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          findMany: {
            args: Prisma.FounderLoanTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>[]
          }
          create: {
            args: Prisma.FounderLoanTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          createMany: {
            args: Prisma.FounderLoanTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FounderLoanTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>[]
          }
          delete: {
            args: Prisma.FounderLoanTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          update: {
            args: Prisma.FounderLoanTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          deleteMany: {
            args: Prisma.FounderLoanTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FounderLoanTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FounderLoanTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>[]
          }
          upsert: {
            args: Prisma.FounderLoanTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLoanTransactionPayload>
          }
          aggregate: {
            args: Prisma.FounderLoanTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFounderLoanTransaction>
          }
          groupBy: {
            args: Prisma.FounderLoanTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FounderLoanTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FounderLoanTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<FounderLoanTransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    stock?: StockOmit
    stockMovement?: StockMovementOmit
    order?: OrderOmit
    remittance?: RemittanceOmit
    expense?: ExpenseOmit
    bankTransaction?: BankTransactionOmit
    founderLoanTransaction?: FounderLoanTransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    stockMoveemnts: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stockMoveemnts?: boolean | OrderCountOutputTypeCountStockMoveemntsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStockMoveemntsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }


  /**
   * Count Type RemittanceCountOutputType
   */

  export type RemittanceCountOutputType = {
    orders: number
    bankTransactions: number
  }

  export type RemittanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | RemittanceCountOutputTypeCountOrdersArgs
    bankTransactions?: boolean | RemittanceCountOutputTypeCountBankTransactionsArgs
  }

  // Custom InputTypes
  /**
   * RemittanceCountOutputType without action
   */
  export type RemittanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemittanceCountOutputType
     */
    select?: RemittanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RemittanceCountOutputType without action
   */
  export type RemittanceCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * RemittanceCountOutputType without action
   */
  export type RemittanceCountOutputTypeCountBankTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    quantityOnHand: number | null
    quantityReserved: number | null
    quantity: number | null
    averageCost: number | null
    lastPurchasePrice: number | null
    reorderPoint: number | null
    reorderQuantity: number | null
  }

  export type StockSumAggregateOutputType = {
    quantityOnHand: number | null
    quantityReserved: number | null
    quantity: number | null
    averageCost: number | null
    lastPurchasePrice: number | null
    reorderPoint: number | null
    reorderQuantity: number | null
  }

  export type StockMinAggregateOutputType = {
    id: string | null
    productId: string | null
    productTitle: string | null
    quantityOnHand: number | null
    quantityReserved: number | null
    quantity: number | null
    averageCost: number | null
    lastPurchasePrice: number | null
    reorderPoint: number | null
    reorderQuantity: number | null
    updatedAt: Date | null
  }

  export type StockMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    productTitle: string | null
    quantityOnHand: number | null
    quantityReserved: number | null
    quantity: number | null
    averageCost: number | null
    lastPurchasePrice: number | null
    reorderPoint: number | null
    reorderQuantity: number | null
    updatedAt: Date | null
  }

  export type StockCountAggregateOutputType = {
    id: number
    productId: number
    productTitle: number
    quantityOnHand: number
    quantityReserved: number
    quantity: number
    averageCost: number
    lastPurchasePrice: number
    reorderPoint: number
    reorderQuantity: number
    updatedAt: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    quantityOnHand?: true
    quantityReserved?: true
    quantity?: true
    averageCost?: true
    lastPurchasePrice?: true
    reorderPoint?: true
    reorderQuantity?: true
  }

  export type StockSumAggregateInputType = {
    quantityOnHand?: true
    quantityReserved?: true
    quantity?: true
    averageCost?: true
    lastPurchasePrice?: true
    reorderPoint?: true
    reorderQuantity?: true
  }

  export type StockMinAggregateInputType = {
    id?: true
    productId?: true
    productTitle?: true
    quantityOnHand?: true
    quantityReserved?: true
    quantity?: true
    averageCost?: true
    lastPurchasePrice?: true
    reorderPoint?: true
    reorderQuantity?: true
    updatedAt?: true
  }

  export type StockMaxAggregateInputType = {
    id?: true
    productId?: true
    productTitle?: true
    quantityOnHand?: true
    quantityReserved?: true
    quantity?: true
    averageCost?: true
    lastPurchasePrice?: true
    reorderPoint?: true
    reorderQuantity?: true
    updatedAt?: true
  }

  export type StockCountAggregateInputType = {
    id?: true
    productId?: true
    productTitle?: true
    quantityOnHand?: true
    quantityReserved?: true
    quantity?: true
    averageCost?: true
    lastPurchasePrice?: true
    reorderPoint?: true
    reorderQuantity?: true
    updatedAt?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    id: string
    productId: string
    productTitle: string
    quantityOnHand: number
    quantityReserved: number
    quantity: number
    averageCost: number | null
    lastPurchasePrice: number | null
    reorderPoint: number | null
    reorderQuantity: number | null
    updatedAt: Date
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    productTitle?: boolean
    quantityOnHand?: boolean
    quantityReserved?: boolean
    quantity?: boolean
    averageCost?: boolean
    lastPurchasePrice?: boolean
    reorderPoint?: boolean
    reorderQuantity?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    productTitle?: boolean
    quantityOnHand?: boolean
    quantityReserved?: boolean
    quantity?: boolean
    averageCost?: boolean
    lastPurchasePrice?: boolean
    reorderPoint?: boolean
    reorderQuantity?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stock"]>

  export type StockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    productTitle?: boolean
    quantityOnHand?: boolean
    quantityReserved?: boolean
    quantity?: boolean
    averageCost?: boolean
    lastPurchasePrice?: boolean
    reorderPoint?: boolean
    reorderQuantity?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    id?: boolean
    productId?: boolean
    productTitle?: boolean
    quantityOnHand?: boolean
    quantityReserved?: boolean
    quantity?: boolean
    averageCost?: boolean
    lastPurchasePrice?: boolean
    reorderPoint?: boolean
    reorderQuantity?: boolean
    updatedAt?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "productTitle" | "quantityOnHand" | "quantityReserved" | "quantity" | "averageCost" | "lastPurchasePrice" | "reorderPoint" | "reorderQuantity" | "updatedAt", ExtArgs["result"]["stock"]>

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      productTitle: string
      quantityOnHand: number
      quantityReserved: number
      quantity: number
      averageCost: number | null
      lastPurchasePrice: number | null
      reorderPoint: number | null
      reorderQuantity: number | null
      updatedAt: Date
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockWithIdOnly = await prisma.stock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks and returns the data updated in the database.
     * @param {StockUpdateManyAndReturnArgs} args - Arguments to update many Stocks.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockUpdateManyAndReturnArgs>(args: SelectSubset<T, StockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly id: FieldRef<"Stock", 'String'>
    readonly productId: FieldRef<"Stock", 'String'>
    readonly productTitle: FieldRef<"Stock", 'String'>
    readonly quantityOnHand: FieldRef<"Stock", 'Int'>
    readonly quantityReserved: FieldRef<"Stock", 'Int'>
    readonly quantity: FieldRef<"Stock", 'Int'>
    readonly averageCost: FieldRef<"Stock", 'Float'>
    readonly lastPurchasePrice: FieldRef<"Stock", 'Float'>
    readonly reorderPoint: FieldRef<"Stock", 'Int'>
    readonly reorderQuantity: FieldRef<"Stock", 'Int'>
    readonly updatedAt: FieldRef<"Stock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock updateManyAndReturn
   */
  export type StockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
  }


  /**
   * Model StockMovement
   */

  export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  export type StockMovementAvgAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
  }

  export type StockMovementSumAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    totalCost: number | null
  }

  export type StockMovementMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    productId: string | null
    productTitle: string | null
    quantity: number | null
    type: $Enums.StockMovementType | null
    orderId: string | null
    notes: string | null
    isReservation: boolean | null
    unitCost: number | null
    totalCost: number | null
  }

  export type StockMovementMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    productId: string | null
    productTitle: string | null
    quantity: number | null
    type: $Enums.StockMovementType | null
    orderId: string | null
    notes: string | null
    isReservation: boolean | null
    unitCost: number | null
    totalCost: number | null
  }

  export type StockMovementCountAggregateOutputType = {
    id: number
    createdAt: number
    productId: number
    productTitle: number
    quantity: number
    type: number
    orderId: number
    notes: number
    isReservation: number
    unitCost: number
    totalCost: number
    _all: number
  }


  export type StockMovementAvgAggregateInputType = {
    quantity?: true
    unitCost?: true
    totalCost?: true
  }

  export type StockMovementSumAggregateInputType = {
    quantity?: true
    unitCost?: true
    totalCost?: true
  }

  export type StockMovementMinAggregateInputType = {
    id?: true
    createdAt?: true
    productId?: true
    productTitle?: true
    quantity?: true
    type?: true
    orderId?: true
    notes?: true
    isReservation?: true
    unitCost?: true
    totalCost?: true
  }

  export type StockMovementMaxAggregateInputType = {
    id?: true
    createdAt?: true
    productId?: true
    productTitle?: true
    quantity?: true
    type?: true
    orderId?: true
    notes?: true
    isReservation?: true
    unitCost?: true
    totalCost?: true
  }

  export type StockMovementCountAggregateInputType = {
    id?: true
    createdAt?: true
    productId?: true
    productTitle?: true
    quantity?: true
    type?: true
    orderId?: true
    notes?: true
    isReservation?: true
    unitCost?: true
    totalCost?: true
    _all?: true
  }

  export type StockMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType
  }

  export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockMovement[P]>
      : GetScalarType<T[P], AggregateStockMovement[P]>
  }




  export type StockMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithAggregationInput | StockMovementOrderByWithAggregationInput[]
    by: StockMovementScalarFieldEnum[] | StockMovementScalarFieldEnum
    having?: StockMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockMovementCountAggregateInputType | true
    _avg?: StockMovementAvgAggregateInputType
    _sum?: StockMovementSumAggregateInputType
    _min?: StockMovementMinAggregateInputType
    _max?: StockMovementMaxAggregateInputType
  }

  export type StockMovementGroupByOutputType = {
    id: string
    createdAt: Date
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    orderId: string | null
    notes: string | null
    isReservation: boolean
    unitCost: number | null
    totalCost: number | null
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
            : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
        }
      >
    >


  export type StockMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    productId?: boolean
    productTitle?: boolean
    quantity?: boolean
    type?: boolean
    orderId?: boolean
    notes?: boolean
    isReservation?: boolean
    unitCost?: boolean
    totalCost?: boolean
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    productId?: boolean
    productTitle?: boolean
    quantity?: boolean
    type?: boolean
    orderId?: boolean
    notes?: boolean
    isReservation?: boolean
    unitCost?: boolean
    totalCost?: boolean
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    productId?: boolean
    productTitle?: boolean
    quantity?: boolean
    type?: boolean
    orderId?: boolean
    notes?: boolean
    isReservation?: boolean
    unitCost?: boolean
    totalCost?: boolean
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectScalar = {
    id?: boolean
    createdAt?: boolean
    productId?: boolean
    productTitle?: boolean
    quantity?: boolean
    type?: boolean
    orderId?: boolean
    notes?: boolean
    isReservation?: boolean
    unitCost?: boolean
    totalCost?: boolean
  }

  export type StockMovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "productId" | "productTitle" | "quantity" | "type" | "orderId" | "notes" | "isReservation" | "unitCost" | "totalCost", ExtArgs["result"]["stockMovement"]>
  export type StockMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }
  export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }
  export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | StockMovement$orderArgs<ExtArgs>
  }

  export type $StockMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockMovement"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      productId: string
      productTitle: string
      quantity: number
      type: $Enums.StockMovementType
      orderId: string | null
      notes: string | null
      isReservation: boolean
      unitCost: number | null
      totalCost: number | null
    }, ExtArgs["result"]["stockMovement"]>
    composites: {}
  }

  type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = $Result.GetResult<Prisma.$StockMovementPayload, S>

  type StockMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockMovementCountAggregateInputType | true
    }

  export interface StockMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'], meta: { name: 'StockMovement' } }
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     * 
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockMovementFindManyArgs>(args?: SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     * 
     */
    create<T extends StockMovementCreateArgs>(args: SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     * 
     */
    delete<T extends StockMovementDeleteArgs>(args: SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockMovementUpdateArgs>(args: SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(
      args?: Subset<T, StockMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockMovementAggregateArgs>(args: Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>

    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockMovementGroupByArgs['orderBy'] }
        : { orderBy?: StockMovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockMovement model
   */
  readonly fields: StockMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends StockMovement$orderArgs<ExtArgs> = {}>(args?: Subset<T, StockMovement$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockMovement model
   */
  interface StockMovementFieldRefs {
    readonly id: FieldRef<"StockMovement", 'String'>
    readonly createdAt: FieldRef<"StockMovement", 'DateTime'>
    readonly productId: FieldRef<"StockMovement", 'String'>
    readonly productTitle: FieldRef<"StockMovement", 'String'>
    readonly quantity: FieldRef<"StockMovement", 'Int'>
    readonly type: FieldRef<"StockMovement", 'StockMovementType'>
    readonly orderId: FieldRef<"StockMovement", 'String'>
    readonly notes: FieldRef<"StockMovement", 'String'>
    readonly isReservation: FieldRef<"StockMovement", 'Boolean'>
    readonly unitCost: FieldRef<"StockMovement", 'Float'>
    readonly totalCost: FieldRef<"StockMovement", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * StockMovement findUnique
   */
  export type StockMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findUniqueOrThrow
   */
  export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findFirst
   */
  export type StockMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findFirstOrThrow
   */
  export type StockMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findMany
   */
  export type StockMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement create
   */
  export type StockMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a StockMovement.
     */
    data: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
  }

  /**
   * StockMovement createMany
   */
  export type StockMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockMovement createManyAndReturn
   */
  export type StockMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement update
   */
  export type StockMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a StockMovement.
     */
    data: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
    /**
     * Choose, which StockMovement to update.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement updateMany
   */
  export type StockMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
  }

  /**
   * StockMovement updateManyAndReturn
   */
  export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement upsert
   */
  export type StockMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: StockMovementWhereUniqueInput
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
  }

  /**
   * StockMovement delete
   */
  export type StockMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter which StockMovement to delete.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement deleteMany
   */
  export type StockMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number
  }

  /**
   * StockMovement.order
   */
  export type StockMovement$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * StockMovement without action
   */
  export type StockMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    quantity: number | null
    expectedPrice: number | null
    cashCollected: number | null
    actualPaidPrice: number | null
    productCost: number | null
    shippingFee: number | null
    additionalCosts: number | null
  }

  export type OrderSumAggregateOutputType = {
    quantity: number | null
    expectedPrice: number | null
    cashCollected: number | null
    actualPaidPrice: number | null
    productCost: number | null
    shippingFee: number | null
    additionalCosts: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    returnedAt: Date | null
    customerName: string | null
    customerPhone: string | null
    city: string | null
    address: string | null
    productId: string | null
    productTitle: string | null
    comboDetails: string | null
    quantity: number | null
    expectedPrice: number | null
    cashCollected: number | null
    actualPaidPrice: number | null
    productCost: number | null
    shippingFee: number | null
    additionalCosts: number | null
    type: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    notes: string | null
    remittanceId: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    returnedAt: Date | null
    customerName: string | null
    customerPhone: string | null
    city: string | null
    address: string | null
    productId: string | null
    productTitle: string | null
    comboDetails: string | null
    quantity: number | null
    expectedPrice: number | null
    cashCollected: number | null
    actualPaidPrice: number | null
    productCost: number | null
    shippingFee: number | null
    additionalCosts: number | null
    type: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    notes: string | null
    remittanceId: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    returnedAt: number
    customerName: number
    customerPhone: number
    city: number
    address: number
    productId: number
    productTitle: number
    comboDetails: number
    quantity: number
    expectedPrice: number
    cashCollected: number
    actualPaidPrice: number
    productCost: number
    shippingFee: number
    additionalCosts: number
    type: number
    status: number
    paymentStatus: number
    notes: number
    remittanceId: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    quantity?: true
    expectedPrice?: true
    cashCollected?: true
    actualPaidPrice?: true
    productCost?: true
    shippingFee?: true
    additionalCosts?: true
  }

  export type OrderSumAggregateInputType = {
    quantity?: true
    expectedPrice?: true
    cashCollected?: true
    actualPaidPrice?: true
    productCost?: true
    shippingFee?: true
    additionalCosts?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    returnedAt?: true
    customerName?: true
    customerPhone?: true
    city?: true
    address?: true
    productId?: true
    productTitle?: true
    comboDetails?: true
    quantity?: true
    expectedPrice?: true
    cashCollected?: true
    actualPaidPrice?: true
    productCost?: true
    shippingFee?: true
    additionalCosts?: true
    type?: true
    status?: true
    paymentStatus?: true
    notes?: true
    remittanceId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    returnedAt?: true
    customerName?: true
    customerPhone?: true
    city?: true
    address?: true
    productId?: true
    productTitle?: true
    comboDetails?: true
    quantity?: true
    expectedPrice?: true
    cashCollected?: true
    actualPaidPrice?: true
    productCost?: true
    shippingFee?: true
    additionalCosts?: true
    type?: true
    status?: true
    paymentStatus?: true
    notes?: true
    remittanceId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    returnedAt?: true
    customerName?: true
    customerPhone?: true
    city?: true
    address?: true
    productId?: true
    productTitle?: true
    comboDetails?: true
    quantity?: true
    expectedPrice?: true
    cashCollected?: true
    actualPaidPrice?: true
    productCost?: true
    shippingFee?: true
    additionalCosts?: true
    type?: true
    status?: true
    paymentStatus?: true
    notes?: true
    remittanceId?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    returnedAt: Date | null
    customerName: string
    customerPhone: string
    city: string | null
    address: string | null
    productId: string | null
    productTitle: string | null
    comboDetails: string | null
    quantity: number
    expectedPrice: number
    cashCollected: number | null
    actualPaidPrice: number | null
    productCost: number
    shippingFee: number
    additionalCosts: number
    type: $Enums.OrderType
    status: $Enums.OrderStatus
    paymentStatus: $Enums.PaymentStatus
    notes: string | null
    remittanceId: string | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnedAt?: boolean
    customerName?: boolean
    customerPhone?: boolean
    city?: boolean
    address?: boolean
    productId?: boolean
    productTitle?: boolean
    comboDetails?: boolean
    quantity?: boolean
    expectedPrice?: boolean
    cashCollected?: boolean
    actualPaidPrice?: boolean
    productCost?: boolean
    shippingFee?: boolean
    additionalCosts?: boolean
    type?: boolean
    status?: boolean
    paymentStatus?: boolean
    notes?: boolean
    remittanceId?: boolean
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
    stockMoveemnts?: boolean | Order$stockMoveemntsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnedAt?: boolean
    customerName?: boolean
    customerPhone?: boolean
    city?: boolean
    address?: boolean
    productId?: boolean
    productTitle?: boolean
    comboDetails?: boolean
    quantity?: boolean
    expectedPrice?: boolean
    cashCollected?: boolean
    actualPaidPrice?: boolean
    productCost?: boolean
    shippingFee?: boolean
    additionalCosts?: boolean
    type?: boolean
    status?: boolean
    paymentStatus?: boolean
    notes?: boolean
    remittanceId?: boolean
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnedAt?: boolean
    customerName?: boolean
    customerPhone?: boolean
    city?: boolean
    address?: boolean
    productId?: boolean
    productTitle?: boolean
    comboDetails?: boolean
    quantity?: boolean
    expectedPrice?: boolean
    cashCollected?: boolean
    actualPaidPrice?: boolean
    productCost?: boolean
    shippingFee?: boolean
    additionalCosts?: boolean
    type?: boolean
    status?: boolean
    paymentStatus?: boolean
    notes?: boolean
    remittanceId?: boolean
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    returnedAt?: boolean
    customerName?: boolean
    customerPhone?: boolean
    city?: boolean
    address?: boolean
    productId?: boolean
    productTitle?: boolean
    comboDetails?: boolean
    quantity?: boolean
    expectedPrice?: boolean
    cashCollected?: boolean
    actualPaidPrice?: boolean
    productCost?: boolean
    shippingFee?: boolean
    additionalCosts?: boolean
    type?: boolean
    status?: boolean
    paymentStatus?: boolean
    notes?: boolean
    remittanceId?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "returnedAt" | "customerName" | "customerPhone" | "city" | "address" | "productId" | "productTitle" | "comboDetails" | "quantity" | "expectedPrice" | "cashCollected" | "actualPaidPrice" | "productCost" | "shippingFee" | "additionalCosts" | "type" | "status" | "paymentStatus" | "notes" | "remittanceId", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
    stockMoveemnts?: boolean | Order$stockMoveemntsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | Order$remittanceArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      remittance: Prisma.$RemittancePayload<ExtArgs> | null
      stockMoveemnts: Prisma.$StockMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      returnedAt: Date | null
      customerName: string
      customerPhone: string
      city: string | null
      address: string | null
      productId: string | null
      productTitle: string | null
      comboDetails: string | null
      quantity: number
      expectedPrice: number
      cashCollected: number | null
      actualPaidPrice: number | null
      productCost: number
      shippingFee: number
      additionalCosts: number
      type: $Enums.OrderType
      status: $Enums.OrderStatus
      paymentStatus: $Enums.PaymentStatus
      notes: string | null
      remittanceId: string | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    remittance<T extends Order$remittanceArgs<ExtArgs> = {}>(args?: Subset<T, Order$remittanceArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stockMoveemnts<T extends Order$stockMoveemntsArgs<ExtArgs> = {}>(args?: Subset<T, Order$stockMoveemntsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly returnedAt: FieldRef<"Order", 'DateTime'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly city: FieldRef<"Order", 'String'>
    readonly address: FieldRef<"Order", 'String'>
    readonly productId: FieldRef<"Order", 'String'>
    readonly productTitle: FieldRef<"Order", 'String'>
    readonly comboDetails: FieldRef<"Order", 'String'>
    readonly quantity: FieldRef<"Order", 'Int'>
    readonly expectedPrice: FieldRef<"Order", 'Float'>
    readonly cashCollected: FieldRef<"Order", 'Float'>
    readonly actualPaidPrice: FieldRef<"Order", 'Float'>
    readonly productCost: FieldRef<"Order", 'Float'>
    readonly shippingFee: FieldRef<"Order", 'Float'>
    readonly additionalCosts: FieldRef<"Order", 'Float'>
    readonly type: FieldRef<"Order", 'OrderType'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly paymentStatus: FieldRef<"Order", 'PaymentStatus'>
    readonly notes: FieldRef<"Order", 'String'>
    readonly remittanceId: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.remittance
   */
  export type Order$remittanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    where?: RemittanceWhereInput
  }

  /**
   * Order.stockMoveemnts
   */
  export type Order$stockMoveemntsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model Remittance
   */

  export type AggregateRemittance = {
    _count: RemittanceCountAggregateOutputType | null
    _avg: RemittanceAvgAggregateOutputType | null
    _sum: RemittanceSumAggregateOutputType | null
    _min: RemittanceMinAggregateOutputType | null
    _max: RemittanceMaxAggregateOutputType | null
  }

  export type RemittanceAvgAggregateOutputType = {
    totalAmount: number | null
  }

  export type RemittanceSumAggregateOutputType = {
    totalAmount: number | null
  }

  export type RemittanceMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    totalAmount: number | null
    bankReference: string | null
    dateReceived: Date | null
    notes: string | null
  }

  export type RemittanceMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    totalAmount: number | null
    bankReference: string | null
    dateReceived: Date | null
    notes: string | null
  }

  export type RemittanceCountAggregateOutputType = {
    id: number
    createdAt: number
    totalAmount: number
    bankReference: number
    dateReceived: number
    notes: number
    _all: number
  }


  export type RemittanceAvgAggregateInputType = {
    totalAmount?: true
  }

  export type RemittanceSumAggregateInputType = {
    totalAmount?: true
  }

  export type RemittanceMinAggregateInputType = {
    id?: true
    createdAt?: true
    totalAmount?: true
    bankReference?: true
    dateReceived?: true
    notes?: true
  }

  export type RemittanceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    totalAmount?: true
    bankReference?: true
    dateReceived?: true
    notes?: true
  }

  export type RemittanceCountAggregateInputType = {
    id?: true
    createdAt?: true
    totalAmount?: true
    bankReference?: true
    dateReceived?: true
    notes?: true
    _all?: true
  }

  export type RemittanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Remittance to aggregate.
     */
    where?: RemittanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Remittances to fetch.
     */
    orderBy?: RemittanceOrderByWithRelationInput | RemittanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RemittanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Remittances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Remittances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Remittances
    **/
    _count?: true | RemittanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RemittanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RemittanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RemittanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RemittanceMaxAggregateInputType
  }

  export type GetRemittanceAggregateType<T extends RemittanceAggregateArgs> = {
        [P in keyof T & keyof AggregateRemittance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRemittance[P]>
      : GetScalarType<T[P], AggregateRemittance[P]>
  }




  export type RemittanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RemittanceWhereInput
    orderBy?: RemittanceOrderByWithAggregationInput | RemittanceOrderByWithAggregationInput[]
    by: RemittanceScalarFieldEnum[] | RemittanceScalarFieldEnum
    having?: RemittanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RemittanceCountAggregateInputType | true
    _avg?: RemittanceAvgAggregateInputType
    _sum?: RemittanceSumAggregateInputType
    _min?: RemittanceMinAggregateInputType
    _max?: RemittanceMaxAggregateInputType
  }

  export type RemittanceGroupByOutputType = {
    id: string
    createdAt: Date
    totalAmount: number
    bankReference: string | null
    dateReceived: Date
    notes: string | null
    _count: RemittanceCountAggregateOutputType | null
    _avg: RemittanceAvgAggregateOutputType | null
    _sum: RemittanceSumAggregateOutputType | null
    _min: RemittanceMinAggregateOutputType | null
    _max: RemittanceMaxAggregateOutputType | null
  }

  type GetRemittanceGroupByPayload<T extends RemittanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RemittanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RemittanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RemittanceGroupByOutputType[P]>
            : GetScalarType<T[P], RemittanceGroupByOutputType[P]>
        }
      >
    >


  export type RemittanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    totalAmount?: boolean
    bankReference?: boolean
    dateReceived?: boolean
    notes?: boolean
    orders?: boolean | Remittance$ordersArgs<ExtArgs>
    bankTransactions?: boolean | Remittance$bankTransactionsArgs<ExtArgs>
    _count?: boolean | RemittanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["remittance"]>

  export type RemittanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    totalAmount?: boolean
    bankReference?: boolean
    dateReceived?: boolean
    notes?: boolean
  }, ExtArgs["result"]["remittance"]>

  export type RemittanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    totalAmount?: boolean
    bankReference?: boolean
    dateReceived?: boolean
    notes?: boolean
  }, ExtArgs["result"]["remittance"]>

  export type RemittanceSelectScalar = {
    id?: boolean
    createdAt?: boolean
    totalAmount?: boolean
    bankReference?: boolean
    dateReceived?: boolean
    notes?: boolean
  }

  export type RemittanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "totalAmount" | "bankReference" | "dateReceived" | "notes", ExtArgs["result"]["remittance"]>
  export type RemittanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Remittance$ordersArgs<ExtArgs>
    bankTransactions?: boolean | Remittance$bankTransactionsArgs<ExtArgs>
    _count?: boolean | RemittanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RemittanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RemittanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RemittancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Remittance"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      bankTransactions: Prisma.$BankTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      totalAmount: number
      bankReference: string | null
      dateReceived: Date
      notes: string | null
    }, ExtArgs["result"]["remittance"]>
    composites: {}
  }

  type RemittanceGetPayload<S extends boolean | null | undefined | RemittanceDefaultArgs> = $Result.GetResult<Prisma.$RemittancePayload, S>

  type RemittanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RemittanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RemittanceCountAggregateInputType | true
    }

  export interface RemittanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Remittance'], meta: { name: 'Remittance' } }
    /**
     * Find zero or one Remittance that matches the filter.
     * @param {RemittanceFindUniqueArgs} args - Arguments to find a Remittance
     * @example
     * // Get one Remittance
     * const remittance = await prisma.remittance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RemittanceFindUniqueArgs>(args: SelectSubset<T, RemittanceFindUniqueArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Remittance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RemittanceFindUniqueOrThrowArgs} args - Arguments to find a Remittance
     * @example
     * // Get one Remittance
     * const remittance = await prisma.remittance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RemittanceFindUniqueOrThrowArgs>(args: SelectSubset<T, RemittanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Remittance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceFindFirstArgs} args - Arguments to find a Remittance
     * @example
     * // Get one Remittance
     * const remittance = await prisma.remittance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RemittanceFindFirstArgs>(args?: SelectSubset<T, RemittanceFindFirstArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Remittance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceFindFirstOrThrowArgs} args - Arguments to find a Remittance
     * @example
     * // Get one Remittance
     * const remittance = await prisma.remittance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RemittanceFindFirstOrThrowArgs>(args?: SelectSubset<T, RemittanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Remittances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Remittances
     * const remittances = await prisma.remittance.findMany()
     * 
     * // Get first 10 Remittances
     * const remittances = await prisma.remittance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const remittanceWithIdOnly = await prisma.remittance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RemittanceFindManyArgs>(args?: SelectSubset<T, RemittanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Remittance.
     * @param {RemittanceCreateArgs} args - Arguments to create a Remittance.
     * @example
     * // Create one Remittance
     * const Remittance = await prisma.remittance.create({
     *   data: {
     *     // ... data to create a Remittance
     *   }
     * })
     * 
     */
    create<T extends RemittanceCreateArgs>(args: SelectSubset<T, RemittanceCreateArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Remittances.
     * @param {RemittanceCreateManyArgs} args - Arguments to create many Remittances.
     * @example
     * // Create many Remittances
     * const remittance = await prisma.remittance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RemittanceCreateManyArgs>(args?: SelectSubset<T, RemittanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Remittances and returns the data saved in the database.
     * @param {RemittanceCreateManyAndReturnArgs} args - Arguments to create many Remittances.
     * @example
     * // Create many Remittances
     * const remittance = await prisma.remittance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Remittances and only return the `id`
     * const remittanceWithIdOnly = await prisma.remittance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RemittanceCreateManyAndReturnArgs>(args?: SelectSubset<T, RemittanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Remittance.
     * @param {RemittanceDeleteArgs} args - Arguments to delete one Remittance.
     * @example
     * // Delete one Remittance
     * const Remittance = await prisma.remittance.delete({
     *   where: {
     *     // ... filter to delete one Remittance
     *   }
     * })
     * 
     */
    delete<T extends RemittanceDeleteArgs>(args: SelectSubset<T, RemittanceDeleteArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Remittance.
     * @param {RemittanceUpdateArgs} args - Arguments to update one Remittance.
     * @example
     * // Update one Remittance
     * const remittance = await prisma.remittance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RemittanceUpdateArgs>(args: SelectSubset<T, RemittanceUpdateArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Remittances.
     * @param {RemittanceDeleteManyArgs} args - Arguments to filter Remittances to delete.
     * @example
     * // Delete a few Remittances
     * const { count } = await prisma.remittance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RemittanceDeleteManyArgs>(args?: SelectSubset<T, RemittanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Remittances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Remittances
     * const remittance = await prisma.remittance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RemittanceUpdateManyArgs>(args: SelectSubset<T, RemittanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Remittances and returns the data updated in the database.
     * @param {RemittanceUpdateManyAndReturnArgs} args - Arguments to update many Remittances.
     * @example
     * // Update many Remittances
     * const remittance = await prisma.remittance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Remittances and only return the `id`
     * const remittanceWithIdOnly = await prisma.remittance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RemittanceUpdateManyAndReturnArgs>(args: SelectSubset<T, RemittanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Remittance.
     * @param {RemittanceUpsertArgs} args - Arguments to update or create a Remittance.
     * @example
     * // Update or create a Remittance
     * const remittance = await prisma.remittance.upsert({
     *   create: {
     *     // ... data to create a Remittance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Remittance we want to update
     *   }
     * })
     */
    upsert<T extends RemittanceUpsertArgs>(args: SelectSubset<T, RemittanceUpsertArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Remittances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceCountArgs} args - Arguments to filter Remittances to count.
     * @example
     * // Count the number of Remittances
     * const count = await prisma.remittance.count({
     *   where: {
     *     // ... the filter for the Remittances we want to count
     *   }
     * })
    **/
    count<T extends RemittanceCountArgs>(
      args?: Subset<T, RemittanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RemittanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Remittance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RemittanceAggregateArgs>(args: Subset<T, RemittanceAggregateArgs>): Prisma.PrismaPromise<GetRemittanceAggregateType<T>>

    /**
     * Group by Remittance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemittanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RemittanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RemittanceGroupByArgs['orderBy'] }
        : { orderBy?: RemittanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RemittanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRemittanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Remittance model
   */
  readonly fields: RemittanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Remittance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RemittanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Remittance$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Remittance$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bankTransactions<T extends Remittance$bankTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, Remittance$bankTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Remittance model
   */
  interface RemittanceFieldRefs {
    readonly id: FieldRef<"Remittance", 'String'>
    readonly createdAt: FieldRef<"Remittance", 'DateTime'>
    readonly totalAmount: FieldRef<"Remittance", 'Float'>
    readonly bankReference: FieldRef<"Remittance", 'String'>
    readonly dateReceived: FieldRef<"Remittance", 'DateTime'>
    readonly notes: FieldRef<"Remittance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Remittance findUnique
   */
  export type RemittanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter, which Remittance to fetch.
     */
    where: RemittanceWhereUniqueInput
  }

  /**
   * Remittance findUniqueOrThrow
   */
  export type RemittanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter, which Remittance to fetch.
     */
    where: RemittanceWhereUniqueInput
  }

  /**
   * Remittance findFirst
   */
  export type RemittanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter, which Remittance to fetch.
     */
    where?: RemittanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Remittances to fetch.
     */
    orderBy?: RemittanceOrderByWithRelationInput | RemittanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Remittances.
     */
    cursor?: RemittanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Remittances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Remittances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Remittances.
     */
    distinct?: RemittanceScalarFieldEnum | RemittanceScalarFieldEnum[]
  }

  /**
   * Remittance findFirstOrThrow
   */
  export type RemittanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter, which Remittance to fetch.
     */
    where?: RemittanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Remittances to fetch.
     */
    orderBy?: RemittanceOrderByWithRelationInput | RemittanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Remittances.
     */
    cursor?: RemittanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Remittances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Remittances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Remittances.
     */
    distinct?: RemittanceScalarFieldEnum | RemittanceScalarFieldEnum[]
  }

  /**
   * Remittance findMany
   */
  export type RemittanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter, which Remittances to fetch.
     */
    where?: RemittanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Remittances to fetch.
     */
    orderBy?: RemittanceOrderByWithRelationInput | RemittanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Remittances.
     */
    cursor?: RemittanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Remittances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Remittances.
     */
    skip?: number
    distinct?: RemittanceScalarFieldEnum | RemittanceScalarFieldEnum[]
  }

  /**
   * Remittance create
   */
  export type RemittanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Remittance.
     */
    data: XOR<RemittanceCreateInput, RemittanceUncheckedCreateInput>
  }

  /**
   * Remittance createMany
   */
  export type RemittanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Remittances.
     */
    data: RemittanceCreateManyInput | RemittanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Remittance createManyAndReturn
   */
  export type RemittanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * The data used to create many Remittances.
     */
    data: RemittanceCreateManyInput | RemittanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Remittance update
   */
  export type RemittanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Remittance.
     */
    data: XOR<RemittanceUpdateInput, RemittanceUncheckedUpdateInput>
    /**
     * Choose, which Remittance to update.
     */
    where: RemittanceWhereUniqueInput
  }

  /**
   * Remittance updateMany
   */
  export type RemittanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Remittances.
     */
    data: XOR<RemittanceUpdateManyMutationInput, RemittanceUncheckedUpdateManyInput>
    /**
     * Filter which Remittances to update
     */
    where?: RemittanceWhereInput
    /**
     * Limit how many Remittances to update.
     */
    limit?: number
  }

  /**
   * Remittance updateManyAndReturn
   */
  export type RemittanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * The data used to update Remittances.
     */
    data: XOR<RemittanceUpdateManyMutationInput, RemittanceUncheckedUpdateManyInput>
    /**
     * Filter which Remittances to update
     */
    where?: RemittanceWhereInput
    /**
     * Limit how many Remittances to update.
     */
    limit?: number
  }

  /**
   * Remittance upsert
   */
  export type RemittanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Remittance to update in case it exists.
     */
    where: RemittanceWhereUniqueInput
    /**
     * In case the Remittance found by the `where` argument doesn't exist, create a new Remittance with this data.
     */
    create: XOR<RemittanceCreateInput, RemittanceUncheckedCreateInput>
    /**
     * In case the Remittance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RemittanceUpdateInput, RemittanceUncheckedUpdateInput>
  }

  /**
   * Remittance delete
   */
  export type RemittanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    /**
     * Filter which Remittance to delete.
     */
    where: RemittanceWhereUniqueInput
  }

  /**
   * Remittance deleteMany
   */
  export type RemittanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Remittances to delete
     */
    where?: RemittanceWhereInput
    /**
     * Limit how many Remittances to delete.
     */
    limit?: number
  }

  /**
   * Remittance.orders
   */
  export type Remittance$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Remittance.bankTransactions
   */
  export type Remittance$bankTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    where?: BankTransactionWhereInput
    orderBy?: BankTransactionOrderByWithRelationInput | BankTransactionOrderByWithRelationInput[]
    cursor?: BankTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BankTransactionScalarFieldEnum | BankTransactionScalarFieldEnum[]
  }

  /**
   * Remittance without action
   */
  export type RemittanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    amount: number | null
    month: number | null
    year: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    amount: number | null
    month: number | null
    year: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    type: $Enums.ExpenseType | null
    amount: number | null
    description: string | null
    reference: string | null
    month: number | null
    year: number | null
    isVirtual: boolean | null
    paidFromBank: boolean | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    type: $Enums.ExpenseType | null
    amount: number | null
    description: string | null
    reference: string | null
    month: number | null
    year: number | null
    isVirtual: boolean | null
    paidFromBank: boolean | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    createdAt: number
    type: number
    amount: number
    description: number
    reference: number
    month: number
    year: number
    isVirtual: number
    paidFromBank: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    amount?: true
    month?: true
    year?: true
  }

  export type ExpenseSumAggregateInputType = {
    amount?: true
    month?: true
    year?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    amount?: true
    description?: true
    reference?: true
    month?: true
    year?: true
    isVirtual?: true
    paidFromBank?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    amount?: true
    description?: true
    reference?: true
    month?: true
    year?: true
    isVirtual?: true
    paidFromBank?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    createdAt?: true
    type?: true
    amount?: true
    description?: true
    reference?: true
    month?: true
    year?: true
    isVirtual?: true
    paidFromBank?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    createdAt: Date
    type: $Enums.ExpenseType
    amount: number
    description: string | null
    reference: string | null
    month: number
    year: number
    isVirtual: boolean
    paidFromBank: boolean
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    reference?: boolean
    month?: boolean
    year?: boolean
    isVirtual?: boolean
    paidFromBank?: boolean
    bankTransaction?: boolean | Expense$bankTransactionArgs<ExtArgs>
    founderLoan?: boolean | Expense$founderLoanArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    reference?: boolean
    month?: boolean
    year?: boolean
    isVirtual?: boolean
    paidFromBank?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    reference?: boolean
    month?: boolean
    year?: boolean
    isVirtual?: boolean
    paidFromBank?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    createdAt?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    reference?: boolean
    month?: boolean
    year?: boolean
    isVirtual?: boolean
    paidFromBank?: boolean
  }

  export type ExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "type" | "amount" | "description" | "reference" | "month" | "year" | "isVirtual" | "paidFromBank", ExtArgs["result"]["expense"]>
  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bankTransaction?: boolean | Expense$bankTransactionArgs<ExtArgs>
    founderLoan?: boolean | Expense$founderLoanArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      bankTransaction: Prisma.$BankTransactionPayload<ExtArgs> | null
      founderLoan: Prisma.$FounderLoanTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      type: $Enums.ExpenseType
      amount: number
      description: string | null
      reference: string | null
      month: number
      year: number
      isVirtual: boolean
      paidFromBank: boolean
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bankTransaction<T extends Expense$bankTransactionArgs<ExtArgs> = {}>(args?: Subset<T, Expense$bankTransactionArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    founderLoan<T extends Expense$founderLoanArgs<ExtArgs> = {}>(args?: Subset<T, Expense$founderLoanArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly type: FieldRef<"Expense", 'ExpenseType'>
    readonly amount: FieldRef<"Expense", 'Float'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly reference: FieldRef<"Expense", 'String'>
    readonly month: FieldRef<"Expense", 'Int'>
    readonly year: FieldRef<"Expense", 'Int'>
    readonly isVirtual: FieldRef<"Expense", 'Boolean'>
    readonly paidFromBank: FieldRef<"Expense", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense updateManyAndReturn
   */
  export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expense.bankTransaction
   */
  export type Expense$bankTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    where?: BankTransactionWhereInput
  }

  /**
   * Expense.founderLoan
   */
  export type Expense$founderLoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    where?: FounderLoanTransactionWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model BankTransaction
   */

  export type AggregateBankTransaction = {
    _count: BankTransactionCountAggregateOutputType | null
    _avg: BankTransactionAvgAggregateOutputType | null
    _sum: BankTransactionSumAggregateOutputType | null
    _min: BankTransactionMinAggregateOutputType | null
    _max: BankTransactionMaxAggregateOutputType | null
  }

  export type BankTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type BankTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type BankTransactionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    type: $Enums.BankTransactionType | null
    remittanceId: string | null
    expenseId: string | null
    note: string | null
  }

  export type BankTransactionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    type: $Enums.BankTransactionType | null
    remittanceId: string | null
    expenseId: string | null
    note: string | null
  }

  export type BankTransactionCountAggregateOutputType = {
    id: number
    createdAt: number
    amount: number
    type: number
    remittanceId: number
    expenseId: number
    note: number
    _all: number
  }


  export type BankTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type BankTransactionSumAggregateInputType = {
    amount?: true
  }

  export type BankTransactionMinAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    remittanceId?: true
    expenseId?: true
    note?: true
  }

  export type BankTransactionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    remittanceId?: true
    expenseId?: true
    note?: true
  }

  export type BankTransactionCountAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    remittanceId?: true
    expenseId?: true
    note?: true
    _all?: true
  }

  export type BankTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankTransaction to aggregate.
     */
    where?: BankTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankTransactions to fetch.
     */
    orderBy?: BankTransactionOrderByWithRelationInput | BankTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankTransactions
    **/
    _count?: true | BankTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BankTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BankTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankTransactionMaxAggregateInputType
  }

  export type GetBankTransactionAggregateType<T extends BankTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateBankTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankTransaction[P]>
      : GetScalarType<T[P], AggregateBankTransaction[P]>
  }




  export type BankTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankTransactionWhereInput
    orderBy?: BankTransactionOrderByWithAggregationInput | BankTransactionOrderByWithAggregationInput[]
    by: BankTransactionScalarFieldEnum[] | BankTransactionScalarFieldEnum
    having?: BankTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankTransactionCountAggregateInputType | true
    _avg?: BankTransactionAvgAggregateInputType
    _sum?: BankTransactionSumAggregateInputType
    _min?: BankTransactionMinAggregateInputType
    _max?: BankTransactionMaxAggregateInputType
  }

  export type BankTransactionGroupByOutputType = {
    id: string
    createdAt: Date
    amount: number
    type: $Enums.BankTransactionType
    remittanceId: string | null
    expenseId: string | null
    note: string | null
    _count: BankTransactionCountAggregateOutputType | null
    _avg: BankTransactionAvgAggregateOutputType | null
    _sum: BankTransactionSumAggregateOutputType | null
    _min: BankTransactionMinAggregateOutputType | null
    _max: BankTransactionMaxAggregateOutputType | null
  }

  type GetBankTransactionGroupByPayload<T extends BankTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], BankTransactionGroupByOutputType[P]>
        }
      >
    >


  export type BankTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    remittanceId?: boolean
    expenseId?: boolean
    note?: boolean
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
    founderLoan?: boolean | BankTransaction$founderLoanArgs<ExtArgs>
  }, ExtArgs["result"]["bankTransaction"]>

  export type BankTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    remittanceId?: boolean
    expenseId?: boolean
    note?: boolean
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
  }, ExtArgs["result"]["bankTransaction"]>

  export type BankTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    remittanceId?: boolean
    expenseId?: boolean
    note?: boolean
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
  }, ExtArgs["result"]["bankTransaction"]>

  export type BankTransactionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    remittanceId?: boolean
    expenseId?: boolean
    note?: boolean
  }

  export type BankTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "amount" | "type" | "remittanceId" | "expenseId" | "note", ExtArgs["result"]["bankTransaction"]>
  export type BankTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
    founderLoan?: boolean | BankTransaction$founderLoanArgs<ExtArgs>
  }
  export type BankTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
  }
  export type BankTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remittance?: boolean | BankTransaction$remittanceArgs<ExtArgs>
    expense?: boolean | BankTransaction$expenseArgs<ExtArgs>
  }

  export type $BankTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankTransaction"
    objects: {
      remittance: Prisma.$RemittancePayload<ExtArgs> | null
      expense: Prisma.$ExpensePayload<ExtArgs> | null
      founderLoan: Prisma.$FounderLoanTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      amount: number
      type: $Enums.BankTransactionType
      remittanceId: string | null
      expenseId: string | null
      note: string | null
    }, ExtArgs["result"]["bankTransaction"]>
    composites: {}
  }

  type BankTransactionGetPayload<S extends boolean | null | undefined | BankTransactionDefaultArgs> = $Result.GetResult<Prisma.$BankTransactionPayload, S>

  type BankTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankTransactionCountAggregateInputType | true
    }

  export interface BankTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankTransaction'], meta: { name: 'BankTransaction' } }
    /**
     * Find zero or one BankTransaction that matches the filter.
     * @param {BankTransactionFindUniqueArgs} args - Arguments to find a BankTransaction
     * @example
     * // Get one BankTransaction
     * const bankTransaction = await prisma.bankTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankTransactionFindUniqueArgs>(args: SelectSubset<T, BankTransactionFindUniqueArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BankTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankTransactionFindUniqueOrThrowArgs} args - Arguments to find a BankTransaction
     * @example
     * // Get one BankTransaction
     * const bankTransaction = await prisma.bankTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, BankTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionFindFirstArgs} args - Arguments to find a BankTransaction
     * @example
     * // Get one BankTransaction
     * const bankTransaction = await prisma.bankTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankTransactionFindFirstArgs>(args?: SelectSubset<T, BankTransactionFindFirstArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionFindFirstOrThrowArgs} args - Arguments to find a BankTransaction
     * @example
     * // Get one BankTransaction
     * const bankTransaction = await prisma.bankTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, BankTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BankTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankTransactions
     * const bankTransactions = await prisma.bankTransaction.findMany()
     * 
     * // Get first 10 BankTransactions
     * const bankTransactions = await prisma.bankTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankTransactionWithIdOnly = await prisma.bankTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankTransactionFindManyArgs>(args?: SelectSubset<T, BankTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BankTransaction.
     * @param {BankTransactionCreateArgs} args - Arguments to create a BankTransaction.
     * @example
     * // Create one BankTransaction
     * const BankTransaction = await prisma.bankTransaction.create({
     *   data: {
     *     // ... data to create a BankTransaction
     *   }
     * })
     * 
     */
    create<T extends BankTransactionCreateArgs>(args: SelectSubset<T, BankTransactionCreateArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BankTransactions.
     * @param {BankTransactionCreateManyArgs} args - Arguments to create many BankTransactions.
     * @example
     * // Create many BankTransactions
     * const bankTransaction = await prisma.bankTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankTransactionCreateManyArgs>(args?: SelectSubset<T, BankTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BankTransactions and returns the data saved in the database.
     * @param {BankTransactionCreateManyAndReturnArgs} args - Arguments to create many BankTransactions.
     * @example
     * // Create many BankTransactions
     * const bankTransaction = await prisma.bankTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BankTransactions and only return the `id`
     * const bankTransactionWithIdOnly = await prisma.bankTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, BankTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BankTransaction.
     * @param {BankTransactionDeleteArgs} args - Arguments to delete one BankTransaction.
     * @example
     * // Delete one BankTransaction
     * const BankTransaction = await prisma.bankTransaction.delete({
     *   where: {
     *     // ... filter to delete one BankTransaction
     *   }
     * })
     * 
     */
    delete<T extends BankTransactionDeleteArgs>(args: SelectSubset<T, BankTransactionDeleteArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BankTransaction.
     * @param {BankTransactionUpdateArgs} args - Arguments to update one BankTransaction.
     * @example
     * // Update one BankTransaction
     * const bankTransaction = await prisma.bankTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankTransactionUpdateArgs>(args: SelectSubset<T, BankTransactionUpdateArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BankTransactions.
     * @param {BankTransactionDeleteManyArgs} args - Arguments to filter BankTransactions to delete.
     * @example
     * // Delete a few BankTransactions
     * const { count } = await prisma.bankTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankTransactionDeleteManyArgs>(args?: SelectSubset<T, BankTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankTransactions
     * const bankTransaction = await prisma.bankTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankTransactionUpdateManyArgs>(args: SelectSubset<T, BankTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankTransactions and returns the data updated in the database.
     * @param {BankTransactionUpdateManyAndReturnArgs} args - Arguments to update many BankTransactions.
     * @example
     * // Update many BankTransactions
     * const bankTransaction = await prisma.bankTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BankTransactions and only return the `id`
     * const bankTransactionWithIdOnly = await prisma.bankTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BankTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, BankTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BankTransaction.
     * @param {BankTransactionUpsertArgs} args - Arguments to update or create a BankTransaction.
     * @example
     * // Update or create a BankTransaction
     * const bankTransaction = await prisma.bankTransaction.upsert({
     *   create: {
     *     // ... data to create a BankTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankTransaction we want to update
     *   }
     * })
     */
    upsert<T extends BankTransactionUpsertArgs>(args: SelectSubset<T, BankTransactionUpsertArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BankTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionCountArgs} args - Arguments to filter BankTransactions to count.
     * @example
     * // Count the number of BankTransactions
     * const count = await prisma.bankTransaction.count({
     *   where: {
     *     // ... the filter for the BankTransactions we want to count
     *   }
     * })
    **/
    count<T extends BankTransactionCountArgs>(
      args?: Subset<T, BankTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankTransactionAggregateArgs>(args: Subset<T, BankTransactionAggregateArgs>): Prisma.PrismaPromise<GetBankTransactionAggregateType<T>>

    /**
     * Group by BankTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankTransactionGroupByArgs['orderBy'] }
        : { orderBy?: BankTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankTransaction model
   */
  readonly fields: BankTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    remittance<T extends BankTransaction$remittanceArgs<ExtArgs> = {}>(args?: Subset<T, BankTransaction$remittanceArgs<ExtArgs>>): Prisma__RemittanceClient<$Result.GetResult<Prisma.$RemittancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    expense<T extends BankTransaction$expenseArgs<ExtArgs> = {}>(args?: Subset<T, BankTransaction$expenseArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    founderLoan<T extends BankTransaction$founderLoanArgs<ExtArgs> = {}>(args?: Subset<T, BankTransaction$founderLoanArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankTransaction model
   */
  interface BankTransactionFieldRefs {
    readonly id: FieldRef<"BankTransaction", 'String'>
    readonly createdAt: FieldRef<"BankTransaction", 'DateTime'>
    readonly amount: FieldRef<"BankTransaction", 'Float'>
    readonly type: FieldRef<"BankTransaction", 'BankTransactionType'>
    readonly remittanceId: FieldRef<"BankTransaction", 'String'>
    readonly expenseId: FieldRef<"BankTransaction", 'String'>
    readonly note: FieldRef<"BankTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BankTransaction findUnique
   */
  export type BankTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BankTransaction to fetch.
     */
    where: BankTransactionWhereUniqueInput
  }

  /**
   * BankTransaction findUniqueOrThrow
   */
  export type BankTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BankTransaction to fetch.
     */
    where: BankTransactionWhereUniqueInput
  }

  /**
   * BankTransaction findFirst
   */
  export type BankTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BankTransaction to fetch.
     */
    where?: BankTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankTransactions to fetch.
     */
    orderBy?: BankTransactionOrderByWithRelationInput | BankTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankTransactions.
     */
    cursor?: BankTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankTransactions.
     */
    distinct?: BankTransactionScalarFieldEnum | BankTransactionScalarFieldEnum[]
  }

  /**
   * BankTransaction findFirstOrThrow
   */
  export type BankTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BankTransaction to fetch.
     */
    where?: BankTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankTransactions to fetch.
     */
    orderBy?: BankTransactionOrderByWithRelationInput | BankTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankTransactions.
     */
    cursor?: BankTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankTransactions.
     */
    distinct?: BankTransactionScalarFieldEnum | BankTransactionScalarFieldEnum[]
  }

  /**
   * BankTransaction findMany
   */
  export type BankTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter, which BankTransactions to fetch.
     */
    where?: BankTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankTransactions to fetch.
     */
    orderBy?: BankTransactionOrderByWithRelationInput | BankTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankTransactions.
     */
    cursor?: BankTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankTransactions.
     */
    skip?: number
    distinct?: BankTransactionScalarFieldEnum | BankTransactionScalarFieldEnum[]
  }

  /**
   * BankTransaction create
   */
  export type BankTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a BankTransaction.
     */
    data: XOR<BankTransactionCreateInput, BankTransactionUncheckedCreateInput>
  }

  /**
   * BankTransaction createMany
   */
  export type BankTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankTransactions.
     */
    data: BankTransactionCreateManyInput | BankTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankTransaction createManyAndReturn
   */
  export type BankTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many BankTransactions.
     */
    data: BankTransactionCreateManyInput | BankTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankTransaction update
   */
  export type BankTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a BankTransaction.
     */
    data: XOR<BankTransactionUpdateInput, BankTransactionUncheckedUpdateInput>
    /**
     * Choose, which BankTransaction to update.
     */
    where: BankTransactionWhereUniqueInput
  }

  /**
   * BankTransaction updateMany
   */
  export type BankTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankTransactions.
     */
    data: XOR<BankTransactionUpdateManyMutationInput, BankTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BankTransactions to update
     */
    where?: BankTransactionWhereInput
    /**
     * Limit how many BankTransactions to update.
     */
    limit?: number
  }

  /**
   * BankTransaction updateManyAndReturn
   */
  export type BankTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * The data used to update BankTransactions.
     */
    data: XOR<BankTransactionUpdateManyMutationInput, BankTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BankTransactions to update
     */
    where?: BankTransactionWhereInput
    /**
     * Limit how many BankTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BankTransaction upsert
   */
  export type BankTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the BankTransaction to update in case it exists.
     */
    where: BankTransactionWhereUniqueInput
    /**
     * In case the BankTransaction found by the `where` argument doesn't exist, create a new BankTransaction with this data.
     */
    create: XOR<BankTransactionCreateInput, BankTransactionUncheckedCreateInput>
    /**
     * In case the BankTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankTransactionUpdateInput, BankTransactionUncheckedUpdateInput>
  }

  /**
   * BankTransaction delete
   */
  export type BankTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    /**
     * Filter which BankTransaction to delete.
     */
    where: BankTransactionWhereUniqueInput
  }

  /**
   * BankTransaction deleteMany
   */
  export type BankTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankTransactions to delete
     */
    where?: BankTransactionWhereInput
    /**
     * Limit how many BankTransactions to delete.
     */
    limit?: number
  }

  /**
   * BankTransaction.remittance
   */
  export type BankTransaction$remittanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Remittance
     */
    select?: RemittanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Remittance
     */
    omit?: RemittanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RemittanceInclude<ExtArgs> | null
    where?: RemittanceWhereInput
  }

  /**
   * BankTransaction.expense
   */
  export type BankTransaction$expenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
  }

  /**
   * BankTransaction.founderLoan
   */
  export type BankTransaction$founderLoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    where?: FounderLoanTransactionWhereInput
  }

  /**
   * BankTransaction without action
   */
  export type BankTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
  }


  /**
   * Model FounderLoanTransaction
   */

  export type AggregateFounderLoanTransaction = {
    _count: FounderLoanTransactionCountAggregateOutputType | null
    _avg: FounderLoanTransactionAvgAggregateOutputType | null
    _sum: FounderLoanTransactionSumAggregateOutputType | null
    _min: FounderLoanTransactionMinAggregateOutputType | null
    _max: FounderLoanTransactionMaxAggregateOutputType | null
  }

  export type FounderLoanTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type FounderLoanTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type FounderLoanTransactionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    type: $Enums.FounderLoanType | null
    expenseId: string | null
    bankTransactionId: string | null
    note: string | null
  }

  export type FounderLoanTransactionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    type: $Enums.FounderLoanType | null
    expenseId: string | null
    bankTransactionId: string | null
    note: string | null
  }

  export type FounderLoanTransactionCountAggregateOutputType = {
    id: number
    createdAt: number
    amount: number
    type: number
    expenseId: number
    bankTransactionId: number
    note: number
    _all: number
  }


  export type FounderLoanTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type FounderLoanTransactionSumAggregateInputType = {
    amount?: true
  }

  export type FounderLoanTransactionMinAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    expenseId?: true
    bankTransactionId?: true
    note?: true
  }

  export type FounderLoanTransactionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    expenseId?: true
    bankTransactionId?: true
    note?: true
  }

  export type FounderLoanTransactionCountAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    type?: true
    expenseId?: true
    bankTransactionId?: true
    note?: true
    _all?: true
  }

  export type FounderLoanTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLoanTransaction to aggregate.
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLoanTransactions to fetch.
     */
    orderBy?: FounderLoanTransactionOrderByWithRelationInput | FounderLoanTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FounderLoanTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLoanTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLoanTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FounderLoanTransactions
    **/
    _count?: true | FounderLoanTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FounderLoanTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FounderLoanTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FounderLoanTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FounderLoanTransactionMaxAggregateInputType
  }

  export type GetFounderLoanTransactionAggregateType<T extends FounderLoanTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateFounderLoanTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFounderLoanTransaction[P]>
      : GetScalarType<T[P], AggregateFounderLoanTransaction[P]>
  }




  export type FounderLoanTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLoanTransactionWhereInput
    orderBy?: FounderLoanTransactionOrderByWithAggregationInput | FounderLoanTransactionOrderByWithAggregationInput[]
    by: FounderLoanTransactionScalarFieldEnum[] | FounderLoanTransactionScalarFieldEnum
    having?: FounderLoanTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FounderLoanTransactionCountAggregateInputType | true
    _avg?: FounderLoanTransactionAvgAggregateInputType
    _sum?: FounderLoanTransactionSumAggregateInputType
    _min?: FounderLoanTransactionMinAggregateInputType
    _max?: FounderLoanTransactionMaxAggregateInputType
  }

  export type FounderLoanTransactionGroupByOutputType = {
    id: string
    createdAt: Date
    amount: number
    type: $Enums.FounderLoanType
    expenseId: string | null
    bankTransactionId: string | null
    note: string | null
    _count: FounderLoanTransactionCountAggregateOutputType | null
    _avg: FounderLoanTransactionAvgAggregateOutputType | null
    _sum: FounderLoanTransactionSumAggregateOutputType | null
    _min: FounderLoanTransactionMinAggregateOutputType | null
    _max: FounderLoanTransactionMaxAggregateOutputType | null
  }

  type GetFounderLoanTransactionGroupByPayload<T extends FounderLoanTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FounderLoanTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FounderLoanTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FounderLoanTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], FounderLoanTransactionGroupByOutputType[P]>
        }
      >
    >


  export type FounderLoanTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    expenseId?: boolean
    bankTransactionId?: boolean
    note?: boolean
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }, ExtArgs["result"]["founderLoanTransaction"]>

  export type FounderLoanTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    expenseId?: boolean
    bankTransactionId?: boolean
    note?: boolean
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }, ExtArgs["result"]["founderLoanTransaction"]>

  export type FounderLoanTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    expenseId?: boolean
    bankTransactionId?: boolean
    note?: boolean
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }, ExtArgs["result"]["founderLoanTransaction"]>

  export type FounderLoanTransactionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    type?: boolean
    expenseId?: boolean
    bankTransactionId?: boolean
    note?: boolean
  }

  export type FounderLoanTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "amount" | "type" | "expenseId" | "bankTransactionId" | "note", ExtArgs["result"]["founderLoanTransaction"]>
  export type FounderLoanTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }
  export type FounderLoanTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }
  export type FounderLoanTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expense?: boolean | FounderLoanTransaction$expenseArgs<ExtArgs>
    bankTransaction?: boolean | FounderLoanTransaction$bankTransactionArgs<ExtArgs>
  }

  export type $FounderLoanTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FounderLoanTransaction"
    objects: {
      expense: Prisma.$ExpensePayload<ExtArgs> | null
      bankTransaction: Prisma.$BankTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      amount: number
      type: $Enums.FounderLoanType
      expenseId: string | null
      bankTransactionId: string | null
      note: string | null
    }, ExtArgs["result"]["founderLoanTransaction"]>
    composites: {}
  }

  type FounderLoanTransactionGetPayload<S extends boolean | null | undefined | FounderLoanTransactionDefaultArgs> = $Result.GetResult<Prisma.$FounderLoanTransactionPayload, S>

  type FounderLoanTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FounderLoanTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FounderLoanTransactionCountAggregateInputType | true
    }

  export interface FounderLoanTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FounderLoanTransaction'], meta: { name: 'FounderLoanTransaction' } }
    /**
     * Find zero or one FounderLoanTransaction that matches the filter.
     * @param {FounderLoanTransactionFindUniqueArgs} args - Arguments to find a FounderLoanTransaction
     * @example
     * // Get one FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FounderLoanTransactionFindUniqueArgs>(args: SelectSubset<T, FounderLoanTransactionFindUniqueArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FounderLoanTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FounderLoanTransactionFindUniqueOrThrowArgs} args - Arguments to find a FounderLoanTransaction
     * @example
     * // Get one FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FounderLoanTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, FounderLoanTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLoanTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionFindFirstArgs} args - Arguments to find a FounderLoanTransaction
     * @example
     * // Get one FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FounderLoanTransactionFindFirstArgs>(args?: SelectSubset<T, FounderLoanTransactionFindFirstArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLoanTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionFindFirstOrThrowArgs} args - Arguments to find a FounderLoanTransaction
     * @example
     * // Get one FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FounderLoanTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, FounderLoanTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FounderLoanTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FounderLoanTransactions
     * const founderLoanTransactions = await prisma.founderLoanTransaction.findMany()
     * 
     * // Get first 10 FounderLoanTransactions
     * const founderLoanTransactions = await prisma.founderLoanTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const founderLoanTransactionWithIdOnly = await prisma.founderLoanTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FounderLoanTransactionFindManyArgs>(args?: SelectSubset<T, FounderLoanTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FounderLoanTransaction.
     * @param {FounderLoanTransactionCreateArgs} args - Arguments to create a FounderLoanTransaction.
     * @example
     * // Create one FounderLoanTransaction
     * const FounderLoanTransaction = await prisma.founderLoanTransaction.create({
     *   data: {
     *     // ... data to create a FounderLoanTransaction
     *   }
     * })
     * 
     */
    create<T extends FounderLoanTransactionCreateArgs>(args: SelectSubset<T, FounderLoanTransactionCreateArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FounderLoanTransactions.
     * @param {FounderLoanTransactionCreateManyArgs} args - Arguments to create many FounderLoanTransactions.
     * @example
     * // Create many FounderLoanTransactions
     * const founderLoanTransaction = await prisma.founderLoanTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FounderLoanTransactionCreateManyArgs>(args?: SelectSubset<T, FounderLoanTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FounderLoanTransactions and returns the data saved in the database.
     * @param {FounderLoanTransactionCreateManyAndReturnArgs} args - Arguments to create many FounderLoanTransactions.
     * @example
     * // Create many FounderLoanTransactions
     * const founderLoanTransaction = await prisma.founderLoanTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FounderLoanTransactions and only return the `id`
     * const founderLoanTransactionWithIdOnly = await prisma.founderLoanTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FounderLoanTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, FounderLoanTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FounderLoanTransaction.
     * @param {FounderLoanTransactionDeleteArgs} args - Arguments to delete one FounderLoanTransaction.
     * @example
     * // Delete one FounderLoanTransaction
     * const FounderLoanTransaction = await prisma.founderLoanTransaction.delete({
     *   where: {
     *     // ... filter to delete one FounderLoanTransaction
     *   }
     * })
     * 
     */
    delete<T extends FounderLoanTransactionDeleteArgs>(args: SelectSubset<T, FounderLoanTransactionDeleteArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FounderLoanTransaction.
     * @param {FounderLoanTransactionUpdateArgs} args - Arguments to update one FounderLoanTransaction.
     * @example
     * // Update one FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FounderLoanTransactionUpdateArgs>(args: SelectSubset<T, FounderLoanTransactionUpdateArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FounderLoanTransactions.
     * @param {FounderLoanTransactionDeleteManyArgs} args - Arguments to filter FounderLoanTransactions to delete.
     * @example
     * // Delete a few FounderLoanTransactions
     * const { count } = await prisma.founderLoanTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FounderLoanTransactionDeleteManyArgs>(args?: SelectSubset<T, FounderLoanTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLoanTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FounderLoanTransactions
     * const founderLoanTransaction = await prisma.founderLoanTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FounderLoanTransactionUpdateManyArgs>(args: SelectSubset<T, FounderLoanTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLoanTransactions and returns the data updated in the database.
     * @param {FounderLoanTransactionUpdateManyAndReturnArgs} args - Arguments to update many FounderLoanTransactions.
     * @example
     * // Update many FounderLoanTransactions
     * const founderLoanTransaction = await prisma.founderLoanTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FounderLoanTransactions and only return the `id`
     * const founderLoanTransactionWithIdOnly = await prisma.founderLoanTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FounderLoanTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, FounderLoanTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FounderLoanTransaction.
     * @param {FounderLoanTransactionUpsertArgs} args - Arguments to update or create a FounderLoanTransaction.
     * @example
     * // Update or create a FounderLoanTransaction
     * const founderLoanTransaction = await prisma.founderLoanTransaction.upsert({
     *   create: {
     *     // ... data to create a FounderLoanTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FounderLoanTransaction we want to update
     *   }
     * })
     */
    upsert<T extends FounderLoanTransactionUpsertArgs>(args: SelectSubset<T, FounderLoanTransactionUpsertArgs<ExtArgs>>): Prisma__FounderLoanTransactionClient<$Result.GetResult<Prisma.$FounderLoanTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FounderLoanTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionCountArgs} args - Arguments to filter FounderLoanTransactions to count.
     * @example
     * // Count the number of FounderLoanTransactions
     * const count = await prisma.founderLoanTransaction.count({
     *   where: {
     *     // ... the filter for the FounderLoanTransactions we want to count
     *   }
     * })
    **/
    count<T extends FounderLoanTransactionCountArgs>(
      args?: Subset<T, FounderLoanTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FounderLoanTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FounderLoanTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FounderLoanTransactionAggregateArgs>(args: Subset<T, FounderLoanTransactionAggregateArgs>): Prisma.PrismaPromise<GetFounderLoanTransactionAggregateType<T>>

    /**
     * Group by FounderLoanTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLoanTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FounderLoanTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FounderLoanTransactionGroupByArgs['orderBy'] }
        : { orderBy?: FounderLoanTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FounderLoanTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFounderLoanTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FounderLoanTransaction model
   */
  readonly fields: FounderLoanTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FounderLoanTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FounderLoanTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expense<T extends FounderLoanTransaction$expenseArgs<ExtArgs> = {}>(args?: Subset<T, FounderLoanTransaction$expenseArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bankTransaction<T extends FounderLoanTransaction$bankTransactionArgs<ExtArgs> = {}>(args?: Subset<T, FounderLoanTransaction$bankTransactionArgs<ExtArgs>>): Prisma__BankTransactionClient<$Result.GetResult<Prisma.$BankTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FounderLoanTransaction model
   */
  interface FounderLoanTransactionFieldRefs {
    readonly id: FieldRef<"FounderLoanTransaction", 'String'>
    readonly createdAt: FieldRef<"FounderLoanTransaction", 'DateTime'>
    readonly amount: FieldRef<"FounderLoanTransaction", 'Float'>
    readonly type: FieldRef<"FounderLoanTransaction", 'FounderLoanType'>
    readonly expenseId: FieldRef<"FounderLoanTransaction", 'String'>
    readonly bankTransactionId: FieldRef<"FounderLoanTransaction", 'String'>
    readonly note: FieldRef<"FounderLoanTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FounderLoanTransaction findUnique
   */
  export type FounderLoanTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLoanTransaction to fetch.
     */
    where: FounderLoanTransactionWhereUniqueInput
  }

  /**
   * FounderLoanTransaction findUniqueOrThrow
   */
  export type FounderLoanTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLoanTransaction to fetch.
     */
    where: FounderLoanTransactionWhereUniqueInput
  }

  /**
   * FounderLoanTransaction findFirst
   */
  export type FounderLoanTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLoanTransaction to fetch.
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLoanTransactions to fetch.
     */
    orderBy?: FounderLoanTransactionOrderByWithRelationInput | FounderLoanTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLoanTransactions.
     */
    cursor?: FounderLoanTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLoanTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLoanTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLoanTransactions.
     */
    distinct?: FounderLoanTransactionScalarFieldEnum | FounderLoanTransactionScalarFieldEnum[]
  }

  /**
   * FounderLoanTransaction findFirstOrThrow
   */
  export type FounderLoanTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLoanTransaction to fetch.
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLoanTransactions to fetch.
     */
    orderBy?: FounderLoanTransactionOrderByWithRelationInput | FounderLoanTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLoanTransactions.
     */
    cursor?: FounderLoanTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLoanTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLoanTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLoanTransactions.
     */
    distinct?: FounderLoanTransactionScalarFieldEnum | FounderLoanTransactionScalarFieldEnum[]
  }

  /**
   * FounderLoanTransaction findMany
   */
  export type FounderLoanTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLoanTransactions to fetch.
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLoanTransactions to fetch.
     */
    orderBy?: FounderLoanTransactionOrderByWithRelationInput | FounderLoanTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FounderLoanTransactions.
     */
    cursor?: FounderLoanTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLoanTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLoanTransactions.
     */
    skip?: number
    distinct?: FounderLoanTransactionScalarFieldEnum | FounderLoanTransactionScalarFieldEnum[]
  }

  /**
   * FounderLoanTransaction create
   */
  export type FounderLoanTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a FounderLoanTransaction.
     */
    data: XOR<FounderLoanTransactionCreateInput, FounderLoanTransactionUncheckedCreateInput>
  }

  /**
   * FounderLoanTransaction createMany
   */
  export type FounderLoanTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FounderLoanTransactions.
     */
    data: FounderLoanTransactionCreateManyInput | FounderLoanTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLoanTransaction createManyAndReturn
   */
  export type FounderLoanTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many FounderLoanTransactions.
     */
    data: FounderLoanTransactionCreateManyInput | FounderLoanTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLoanTransaction update
   */
  export type FounderLoanTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a FounderLoanTransaction.
     */
    data: XOR<FounderLoanTransactionUpdateInput, FounderLoanTransactionUncheckedUpdateInput>
    /**
     * Choose, which FounderLoanTransaction to update.
     */
    where: FounderLoanTransactionWhereUniqueInput
  }

  /**
   * FounderLoanTransaction updateMany
   */
  export type FounderLoanTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FounderLoanTransactions.
     */
    data: XOR<FounderLoanTransactionUpdateManyMutationInput, FounderLoanTransactionUncheckedUpdateManyInput>
    /**
     * Filter which FounderLoanTransactions to update
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * Limit how many FounderLoanTransactions to update.
     */
    limit?: number
  }

  /**
   * FounderLoanTransaction updateManyAndReturn
   */
  export type FounderLoanTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * The data used to update FounderLoanTransactions.
     */
    data: XOR<FounderLoanTransactionUpdateManyMutationInput, FounderLoanTransactionUncheckedUpdateManyInput>
    /**
     * Filter which FounderLoanTransactions to update
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * Limit how many FounderLoanTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLoanTransaction upsert
   */
  export type FounderLoanTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the FounderLoanTransaction to update in case it exists.
     */
    where: FounderLoanTransactionWhereUniqueInput
    /**
     * In case the FounderLoanTransaction found by the `where` argument doesn't exist, create a new FounderLoanTransaction with this data.
     */
    create: XOR<FounderLoanTransactionCreateInput, FounderLoanTransactionUncheckedCreateInput>
    /**
     * In case the FounderLoanTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FounderLoanTransactionUpdateInput, FounderLoanTransactionUncheckedUpdateInput>
  }

  /**
   * FounderLoanTransaction delete
   */
  export type FounderLoanTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
    /**
     * Filter which FounderLoanTransaction to delete.
     */
    where: FounderLoanTransactionWhereUniqueInput
  }

  /**
   * FounderLoanTransaction deleteMany
   */
  export type FounderLoanTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLoanTransactions to delete
     */
    where?: FounderLoanTransactionWhereInput
    /**
     * Limit how many FounderLoanTransactions to delete.
     */
    limit?: number
  }

  /**
   * FounderLoanTransaction.expense
   */
  export type FounderLoanTransaction$expenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
  }

  /**
   * FounderLoanTransaction.bankTransaction
   */
  export type FounderLoanTransaction$bankTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankTransaction
     */
    select?: BankTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankTransaction
     */
    omit?: BankTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankTransactionInclude<ExtArgs> | null
    where?: BankTransactionWhereInput
  }

  /**
   * FounderLoanTransaction without action
   */
  export type FounderLoanTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLoanTransaction
     */
    select?: FounderLoanTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLoanTransaction
     */
    omit?: FounderLoanTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLoanTransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StockScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    productTitle: 'productTitle',
    quantityOnHand: 'quantityOnHand',
    quantityReserved: 'quantityReserved',
    quantity: 'quantity',
    averageCost: 'averageCost',
    lastPurchasePrice: 'lastPurchasePrice',
    reorderPoint: 'reorderPoint',
    reorderQuantity: 'reorderQuantity',
    updatedAt: 'updatedAt'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const StockMovementScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    productId: 'productId',
    productTitle: 'productTitle',
    quantity: 'quantity',
    type: 'type',
    orderId: 'orderId',
    notes: 'notes',
    isReservation: 'isReservation',
    unitCost: 'unitCost',
    totalCost: 'totalCost'
  };

  export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    returnedAt: 'returnedAt',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    city: 'city',
    address: 'address',
    productId: 'productId',
    productTitle: 'productTitle',
    comboDetails: 'comboDetails',
    quantity: 'quantity',
    expectedPrice: 'expectedPrice',
    cashCollected: 'cashCollected',
    actualPaidPrice: 'actualPaidPrice',
    productCost: 'productCost',
    shippingFee: 'shippingFee',
    additionalCosts: 'additionalCosts',
    type: 'type',
    status: 'status',
    paymentStatus: 'paymentStatus',
    notes: 'notes',
    remittanceId: 'remittanceId'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const RemittanceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    totalAmount: 'totalAmount',
    bankReference: 'bankReference',
    dateReceived: 'dateReceived',
    notes: 'notes'
  };

  export type RemittanceScalarFieldEnum = (typeof RemittanceScalarFieldEnum)[keyof typeof RemittanceScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    type: 'type',
    amount: 'amount',
    description: 'description',
    reference: 'reference',
    month: 'month',
    year: 'year',
    isVirtual: 'isVirtual',
    paidFromBank: 'paidFromBank'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const BankTransactionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    amount: 'amount',
    type: 'type',
    remittanceId: 'remittanceId',
    expenseId: 'expenseId',
    note: 'note'
  };

  export type BankTransactionScalarFieldEnum = (typeof BankTransactionScalarFieldEnum)[keyof typeof BankTransactionScalarFieldEnum]


  export const FounderLoanTransactionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    amount: 'amount',
    type: 'type',
    expenseId: 'expenseId',
    bankTransactionId: 'bankTransactionId',
    note: 'note'
  };

  export type FounderLoanTransactionScalarFieldEnum = (typeof FounderLoanTransactionScalarFieldEnum)[keyof typeof FounderLoanTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StockMovementType'
   */
  export type EnumStockMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMovementType'>
    


  /**
   * Reference to a field of type 'StockMovementType[]'
   */
  export type ListEnumStockMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMovementType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OrderType'
   */
  export type EnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType'>
    


  /**
   * Reference to a field of type 'OrderType[]'
   */
  export type ListEnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'ExpenseType'
   */
  export type EnumExpenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseType'>
    


  /**
   * Reference to a field of type 'ExpenseType[]'
   */
  export type ListEnumExpenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseType[]'>
    


  /**
   * Reference to a field of type 'BankTransactionType'
   */
  export type EnumBankTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BankTransactionType'>
    


  /**
   * Reference to a field of type 'BankTransactionType[]'
   */
  export type ListEnumBankTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BankTransactionType[]'>
    


  /**
   * Reference to a field of type 'FounderLoanType'
   */
  export type EnumFounderLoanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FounderLoanType'>
    


  /**
   * Reference to a field of type 'FounderLoanType[]'
   */
  export type ListEnumFounderLoanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FounderLoanType[]'>
    
  /**
   * Deep Input Types
   */


  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    id?: StringFilter<"Stock"> | string
    productId?: StringFilter<"Stock"> | string
    productTitle?: StringFilter<"Stock"> | string
    quantityOnHand?: IntFilter<"Stock"> | number
    quantityReserved?: IntFilter<"Stock"> | number
    quantity?: IntFilter<"Stock"> | number
    averageCost?: FloatNullableFilter<"Stock"> | number | null
    lastPurchasePrice?: FloatNullableFilter<"Stock"> | number | null
    reorderPoint?: IntNullableFilter<"Stock"> | number | null
    reorderQuantity?: IntNullableFilter<"Stock"> | number | null
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
  }

  export type StockOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrderInput | SortOrder
    lastPurchasePrice?: SortOrderInput | SortOrder
    reorderPoint?: SortOrderInput | SortOrder
    reorderQuantity?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    productTitle?: StringFilter<"Stock"> | string
    quantityOnHand?: IntFilter<"Stock"> | number
    quantityReserved?: IntFilter<"Stock"> | number
    quantity?: IntFilter<"Stock"> | number
    averageCost?: FloatNullableFilter<"Stock"> | number | null
    lastPurchasePrice?: FloatNullableFilter<"Stock"> | number | null
    reorderPoint?: IntNullableFilter<"Stock"> | number | null
    reorderQuantity?: IntNullableFilter<"Stock"> | number | null
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
  }, "id" | "productId">

  export type StockOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrderInput | SortOrder
    lastPurchasePrice?: SortOrderInput | SortOrder
    reorderPoint?: SortOrderInput | SortOrder
    reorderQuantity?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stock"> | string
    productId?: StringWithAggregatesFilter<"Stock"> | string
    productTitle?: StringWithAggregatesFilter<"Stock"> | string
    quantityOnHand?: IntWithAggregatesFilter<"Stock"> | number
    quantityReserved?: IntWithAggregatesFilter<"Stock"> | number
    quantity?: IntWithAggregatesFilter<"Stock"> | number
    averageCost?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    lastPurchasePrice?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    reorderPoint?: IntNullableWithAggregatesFilter<"Stock"> | number | null
    reorderQuantity?: IntNullableWithAggregatesFilter<"Stock"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
  }

  export type StockMovementWhereInput = {
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    productId?: StringFilter<"StockMovement"> | string
    productTitle?: StringFilter<"StockMovement"> | string
    quantity?: IntFilter<"StockMovement"> | number
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    isReservation?: BoolFilter<"StockMovement"> | boolean
    unitCost?: FloatNullableFilter<"StockMovement"> | number | null
    totalCost?: FloatNullableFilter<"StockMovement"> | number | null
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }

  export type StockMovementOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    orderId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    isReservation?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId_type?: StockMovementOrderIdTypeCompoundUniqueInput
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    productId?: StringFilter<"StockMovement"> | string
    productTitle?: StringFilter<"StockMovement"> | string
    quantity?: IntFilter<"StockMovement"> | number
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    isReservation?: BoolFilter<"StockMovement"> | boolean
    unitCost?: FloatNullableFilter<"StockMovement"> | number | null
    totalCost?: FloatNullableFilter<"StockMovement"> | number | null
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }, "id" | "orderId_type">

  export type StockMovementOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    orderId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    isReservation?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    _count?: StockMovementCountOrderByAggregateInput
    _avg?: StockMovementAvgOrderByAggregateInput
    _max?: StockMovementMaxOrderByAggregateInput
    _min?: StockMovementMinOrderByAggregateInput
    _sum?: StockMovementSumOrderByAggregateInput
  }

  export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    OR?: StockMovementScalarWhereWithAggregatesInput[]
    NOT?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockMovement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StockMovement"> | Date | string
    productId?: StringWithAggregatesFilter<"StockMovement"> | string
    productTitle?: StringWithAggregatesFilter<"StockMovement"> | string
    quantity?: IntWithAggregatesFilter<"StockMovement"> | number
    type?: EnumStockMovementTypeWithAggregatesFilter<"StockMovement"> | $Enums.StockMovementType
    orderId?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    notes?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    isReservation?: BoolWithAggregatesFilter<"StockMovement"> | boolean
    unitCost?: FloatNullableWithAggregatesFilter<"StockMovement"> | number | null
    totalCost?: FloatNullableWithAggregatesFilter<"StockMovement"> | number | null
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    returnedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    city?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    productId?: StringNullableFilter<"Order"> | string | null
    productTitle?: StringNullableFilter<"Order"> | string | null
    comboDetails?: StringNullableFilter<"Order"> | string | null
    quantity?: IntFilter<"Order"> | number
    expectedPrice?: FloatFilter<"Order"> | number
    cashCollected?: FloatNullableFilter<"Order"> | number | null
    actualPaidPrice?: FloatNullableFilter<"Order"> | number | null
    productCost?: FloatFilter<"Order"> | number
    shippingFee?: FloatFilter<"Order"> | number
    additionalCosts?: FloatFilter<"Order"> | number
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    notes?: StringNullableFilter<"Order"> | string | null
    remittanceId?: StringNullableFilter<"Order"> | string | null
    remittance?: XOR<RemittanceNullableScalarRelationFilter, RemittanceWhereInput> | null
    stockMoveemnts?: StockMovementListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnedAt?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    city?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    productId?: SortOrderInput | SortOrder
    productTitle?: SortOrderInput | SortOrder
    comboDetails?: SortOrderInput | SortOrder
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrderInput | SortOrder
    actualPaidPrice?: SortOrderInput | SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
    type?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    remittanceId?: SortOrderInput | SortOrder
    remittance?: RemittanceOrderByWithRelationInput
    stockMoveemnts?: StockMovementOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    returnedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    city?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    productId?: StringNullableFilter<"Order"> | string | null
    productTitle?: StringNullableFilter<"Order"> | string | null
    comboDetails?: StringNullableFilter<"Order"> | string | null
    quantity?: IntFilter<"Order"> | number
    expectedPrice?: FloatFilter<"Order"> | number
    cashCollected?: FloatNullableFilter<"Order"> | number | null
    actualPaidPrice?: FloatNullableFilter<"Order"> | number | null
    productCost?: FloatFilter<"Order"> | number
    shippingFee?: FloatFilter<"Order"> | number
    additionalCosts?: FloatFilter<"Order"> | number
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    notes?: StringNullableFilter<"Order"> | string | null
    remittanceId?: StringNullableFilter<"Order"> | string | null
    remittance?: XOR<RemittanceNullableScalarRelationFilter, RemittanceWhereInput> | null
    stockMoveemnts?: StockMovementListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnedAt?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    city?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    productId?: SortOrderInput | SortOrder
    productTitle?: SortOrderInput | SortOrder
    comboDetails?: SortOrderInput | SortOrder
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrderInput | SortOrder
    actualPaidPrice?: SortOrderInput | SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
    type?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrderInput | SortOrder
    remittanceId?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    returnedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    customerName?: StringWithAggregatesFilter<"Order"> | string
    customerPhone?: StringWithAggregatesFilter<"Order"> | string
    city?: StringNullableWithAggregatesFilter<"Order"> | string | null
    address?: StringNullableWithAggregatesFilter<"Order"> | string | null
    productId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    productTitle?: StringNullableWithAggregatesFilter<"Order"> | string | null
    comboDetails?: StringNullableWithAggregatesFilter<"Order"> | string | null
    quantity?: IntWithAggregatesFilter<"Order"> | number
    expectedPrice?: FloatWithAggregatesFilter<"Order"> | number
    cashCollected?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    actualPaidPrice?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    productCost?: FloatWithAggregatesFilter<"Order"> | number
    shippingFee?: FloatWithAggregatesFilter<"Order"> | number
    additionalCosts?: FloatWithAggregatesFilter<"Order"> | number
    type?: EnumOrderTypeWithAggregatesFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Order"> | $Enums.PaymentStatus
    notes?: StringNullableWithAggregatesFilter<"Order"> | string | null
    remittanceId?: StringNullableWithAggregatesFilter<"Order"> | string | null
  }

  export type RemittanceWhereInput = {
    AND?: RemittanceWhereInput | RemittanceWhereInput[]
    OR?: RemittanceWhereInput[]
    NOT?: RemittanceWhereInput | RemittanceWhereInput[]
    id?: StringFilter<"Remittance"> | string
    createdAt?: DateTimeFilter<"Remittance"> | Date | string
    totalAmount?: FloatFilter<"Remittance"> | number
    bankReference?: StringNullableFilter<"Remittance"> | string | null
    dateReceived?: DateTimeFilter<"Remittance"> | Date | string
    notes?: StringNullableFilter<"Remittance"> | string | null
    orders?: OrderListRelationFilter
    bankTransactions?: BankTransactionListRelationFilter
  }

  export type RemittanceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    totalAmount?: SortOrder
    bankReference?: SortOrderInput | SortOrder
    dateReceived?: SortOrder
    notes?: SortOrderInput | SortOrder
    orders?: OrderOrderByRelationAggregateInput
    bankTransactions?: BankTransactionOrderByRelationAggregateInput
  }

  export type RemittanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RemittanceWhereInput | RemittanceWhereInput[]
    OR?: RemittanceWhereInput[]
    NOT?: RemittanceWhereInput | RemittanceWhereInput[]
    createdAt?: DateTimeFilter<"Remittance"> | Date | string
    totalAmount?: FloatFilter<"Remittance"> | number
    bankReference?: StringNullableFilter<"Remittance"> | string | null
    dateReceived?: DateTimeFilter<"Remittance"> | Date | string
    notes?: StringNullableFilter<"Remittance"> | string | null
    orders?: OrderListRelationFilter
    bankTransactions?: BankTransactionListRelationFilter
  }, "id">

  export type RemittanceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    totalAmount?: SortOrder
    bankReference?: SortOrderInput | SortOrder
    dateReceived?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: RemittanceCountOrderByAggregateInput
    _avg?: RemittanceAvgOrderByAggregateInput
    _max?: RemittanceMaxOrderByAggregateInput
    _min?: RemittanceMinOrderByAggregateInput
    _sum?: RemittanceSumOrderByAggregateInput
  }

  export type RemittanceScalarWhereWithAggregatesInput = {
    AND?: RemittanceScalarWhereWithAggregatesInput | RemittanceScalarWhereWithAggregatesInput[]
    OR?: RemittanceScalarWhereWithAggregatesInput[]
    NOT?: RemittanceScalarWhereWithAggregatesInput | RemittanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Remittance"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Remittance"> | Date | string
    totalAmount?: FloatWithAggregatesFilter<"Remittance"> | number
    bankReference?: StringNullableWithAggregatesFilter<"Remittance"> | string | null
    dateReceived?: DateTimeWithAggregatesFilter<"Remittance"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Remittance"> | string | null
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    type?: EnumExpenseTypeFilter<"Expense"> | $Enums.ExpenseType
    amount?: FloatFilter<"Expense"> | number
    description?: StringNullableFilter<"Expense"> | string | null
    reference?: StringNullableFilter<"Expense"> | string | null
    month?: IntFilter<"Expense"> | number
    year?: IntFilter<"Expense"> | number
    isVirtual?: BoolFilter<"Expense"> | boolean
    paidFromBank?: BoolFilter<"Expense"> | boolean
    bankTransaction?: XOR<BankTransactionNullableScalarRelationFilter, BankTransactionWhereInput> | null
    founderLoan?: XOR<FounderLoanTransactionNullableScalarRelationFilter, FounderLoanTransactionWhereInput> | null
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    month?: SortOrder
    year?: SortOrder
    isVirtual?: SortOrder
    paidFromBank?: SortOrder
    bankTransaction?: BankTransactionOrderByWithRelationInput
    founderLoan?: FounderLoanTransactionOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    type?: EnumExpenseTypeFilter<"Expense"> | $Enums.ExpenseType
    amount?: FloatFilter<"Expense"> | number
    description?: StringNullableFilter<"Expense"> | string | null
    reference?: StringNullableFilter<"Expense"> | string | null
    month?: IntFilter<"Expense"> | number
    year?: IntFilter<"Expense"> | number
    isVirtual?: BoolFilter<"Expense"> | boolean
    paidFromBank?: BoolFilter<"Expense"> | boolean
    bankTransaction?: XOR<BankTransactionNullableScalarRelationFilter, BankTransactionWhereInput> | null
    founderLoan?: XOR<FounderLoanTransactionNullableScalarRelationFilter, FounderLoanTransactionWhereInput> | null
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    month?: SortOrder
    year?: SortOrder
    isVirtual?: SortOrder
    paidFromBank?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    type?: EnumExpenseTypeWithAggregatesFilter<"Expense"> | $Enums.ExpenseType
    amount?: FloatWithAggregatesFilter<"Expense"> | number
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    reference?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    month?: IntWithAggregatesFilter<"Expense"> | number
    year?: IntWithAggregatesFilter<"Expense"> | number
    isVirtual?: BoolWithAggregatesFilter<"Expense"> | boolean
    paidFromBank?: BoolWithAggregatesFilter<"Expense"> | boolean
  }

  export type BankTransactionWhereInput = {
    AND?: BankTransactionWhereInput | BankTransactionWhereInput[]
    OR?: BankTransactionWhereInput[]
    NOT?: BankTransactionWhereInput | BankTransactionWhereInput[]
    id?: StringFilter<"BankTransaction"> | string
    createdAt?: DateTimeFilter<"BankTransaction"> | Date | string
    amount?: FloatFilter<"BankTransaction"> | number
    type?: EnumBankTransactionTypeFilter<"BankTransaction"> | $Enums.BankTransactionType
    remittanceId?: StringNullableFilter<"BankTransaction"> | string | null
    expenseId?: StringNullableFilter<"BankTransaction"> | string | null
    note?: StringNullableFilter<"BankTransaction"> | string | null
    remittance?: XOR<RemittanceNullableScalarRelationFilter, RemittanceWhereInput> | null
    expense?: XOR<ExpenseNullableScalarRelationFilter, ExpenseWhereInput> | null
    founderLoan?: XOR<FounderLoanTransactionNullableScalarRelationFilter, FounderLoanTransactionWhereInput> | null
  }

  export type BankTransactionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    remittanceId?: SortOrderInput | SortOrder
    expenseId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    remittance?: RemittanceOrderByWithRelationInput
    expense?: ExpenseOrderByWithRelationInput
    founderLoan?: FounderLoanTransactionOrderByWithRelationInput
  }

  export type BankTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    expenseId?: string
    AND?: BankTransactionWhereInput | BankTransactionWhereInput[]
    OR?: BankTransactionWhereInput[]
    NOT?: BankTransactionWhereInput | BankTransactionWhereInput[]
    createdAt?: DateTimeFilter<"BankTransaction"> | Date | string
    amount?: FloatFilter<"BankTransaction"> | number
    type?: EnumBankTransactionTypeFilter<"BankTransaction"> | $Enums.BankTransactionType
    remittanceId?: StringNullableFilter<"BankTransaction"> | string | null
    note?: StringNullableFilter<"BankTransaction"> | string | null
    remittance?: XOR<RemittanceNullableScalarRelationFilter, RemittanceWhereInput> | null
    expense?: XOR<ExpenseNullableScalarRelationFilter, ExpenseWhereInput> | null
    founderLoan?: XOR<FounderLoanTransactionNullableScalarRelationFilter, FounderLoanTransactionWhereInput> | null
  }, "id" | "expenseId">

  export type BankTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    remittanceId?: SortOrderInput | SortOrder
    expenseId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: BankTransactionCountOrderByAggregateInput
    _avg?: BankTransactionAvgOrderByAggregateInput
    _max?: BankTransactionMaxOrderByAggregateInput
    _min?: BankTransactionMinOrderByAggregateInput
    _sum?: BankTransactionSumOrderByAggregateInput
  }

  export type BankTransactionScalarWhereWithAggregatesInput = {
    AND?: BankTransactionScalarWhereWithAggregatesInput | BankTransactionScalarWhereWithAggregatesInput[]
    OR?: BankTransactionScalarWhereWithAggregatesInput[]
    NOT?: BankTransactionScalarWhereWithAggregatesInput | BankTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BankTransaction"> | Date | string
    amount?: FloatWithAggregatesFilter<"BankTransaction"> | number
    type?: EnumBankTransactionTypeWithAggregatesFilter<"BankTransaction"> | $Enums.BankTransactionType
    remittanceId?: StringNullableWithAggregatesFilter<"BankTransaction"> | string | null
    expenseId?: StringNullableWithAggregatesFilter<"BankTransaction"> | string | null
    note?: StringNullableWithAggregatesFilter<"BankTransaction"> | string | null
  }

  export type FounderLoanTransactionWhereInput = {
    AND?: FounderLoanTransactionWhereInput | FounderLoanTransactionWhereInput[]
    OR?: FounderLoanTransactionWhereInput[]
    NOT?: FounderLoanTransactionWhereInput | FounderLoanTransactionWhereInput[]
    id?: StringFilter<"FounderLoanTransaction"> | string
    createdAt?: DateTimeFilter<"FounderLoanTransaction"> | Date | string
    amount?: FloatFilter<"FounderLoanTransaction"> | number
    type?: EnumFounderLoanTypeFilter<"FounderLoanTransaction"> | $Enums.FounderLoanType
    expenseId?: StringNullableFilter<"FounderLoanTransaction"> | string | null
    bankTransactionId?: StringNullableFilter<"FounderLoanTransaction"> | string | null
    note?: StringNullableFilter<"FounderLoanTransaction"> | string | null
    expense?: XOR<ExpenseNullableScalarRelationFilter, ExpenseWhereInput> | null
    bankTransaction?: XOR<BankTransactionNullableScalarRelationFilter, BankTransactionWhereInput> | null
  }

  export type FounderLoanTransactionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    expenseId?: SortOrderInput | SortOrder
    bankTransactionId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    expense?: ExpenseOrderByWithRelationInput
    bankTransaction?: BankTransactionOrderByWithRelationInput
  }

  export type FounderLoanTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    expenseId?: string
    bankTransactionId?: string
    AND?: FounderLoanTransactionWhereInput | FounderLoanTransactionWhereInput[]
    OR?: FounderLoanTransactionWhereInput[]
    NOT?: FounderLoanTransactionWhereInput | FounderLoanTransactionWhereInput[]
    createdAt?: DateTimeFilter<"FounderLoanTransaction"> | Date | string
    amount?: FloatFilter<"FounderLoanTransaction"> | number
    type?: EnumFounderLoanTypeFilter<"FounderLoanTransaction"> | $Enums.FounderLoanType
    note?: StringNullableFilter<"FounderLoanTransaction"> | string | null
    expense?: XOR<ExpenseNullableScalarRelationFilter, ExpenseWhereInput> | null
    bankTransaction?: XOR<BankTransactionNullableScalarRelationFilter, BankTransactionWhereInput> | null
  }, "id" | "expenseId" | "bankTransactionId">

  export type FounderLoanTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    expenseId?: SortOrderInput | SortOrder
    bankTransactionId?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: FounderLoanTransactionCountOrderByAggregateInput
    _avg?: FounderLoanTransactionAvgOrderByAggregateInput
    _max?: FounderLoanTransactionMaxOrderByAggregateInput
    _min?: FounderLoanTransactionMinOrderByAggregateInput
    _sum?: FounderLoanTransactionSumOrderByAggregateInput
  }

  export type FounderLoanTransactionScalarWhereWithAggregatesInput = {
    AND?: FounderLoanTransactionScalarWhereWithAggregatesInput | FounderLoanTransactionScalarWhereWithAggregatesInput[]
    OR?: FounderLoanTransactionScalarWhereWithAggregatesInput[]
    NOT?: FounderLoanTransactionScalarWhereWithAggregatesInput | FounderLoanTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FounderLoanTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FounderLoanTransaction"> | Date | string
    amount?: FloatWithAggregatesFilter<"FounderLoanTransaction"> | number
    type?: EnumFounderLoanTypeWithAggregatesFilter<"FounderLoanTransaction"> | $Enums.FounderLoanType
    expenseId?: StringNullableWithAggregatesFilter<"FounderLoanTransaction"> | string | null
    bankTransactionId?: StringNullableWithAggregatesFilter<"FounderLoanTransaction"> | string | null
    note?: StringNullableWithAggregatesFilter<"FounderLoanTransaction"> | string | null
  }

  export type StockCreateInput = {
    id?: string
    productId: string
    productTitle: string
    quantityOnHand?: number
    quantityReserved?: number
    quantity?: number
    averageCost?: number | null
    lastPurchasePrice?: number | null
    reorderPoint?: number | null
    reorderQuantity?: number | null
    updatedAt?: Date | string
  }

  export type StockUncheckedCreateInput = {
    id?: string
    productId: string
    productTitle: string
    quantityOnHand?: number
    quantityReserved?: number
    quantity?: number
    averageCost?: number | null
    lastPurchasePrice?: number | null
    reorderPoint?: number | null
    reorderQuantity?: number | null
    updatedAt?: Date | string
  }

  export type StockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPurchasePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderPoint?: NullableIntFieldUpdateOperationsInput | number | null
    reorderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPurchasePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderPoint?: NullableIntFieldUpdateOperationsInput | number | null
    reorderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateManyInput = {
    id?: string
    productId: string
    productTitle: string
    quantityOnHand?: number
    quantityReserved?: number
    quantity?: number
    averageCost?: number | null
    lastPurchasePrice?: number | null
    reorderPoint?: number | null
    reorderQuantity?: number | null
    updatedAt?: Date | string
  }

  export type StockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPurchasePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderPoint?: NullableIntFieldUpdateOperationsInput | number | null
    reorderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    quantityReserved?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPurchasePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderPoint?: NullableIntFieldUpdateOperationsInput | number | null
    reorderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
    order?: OrderCreateNestedOneWithoutStockMoveemntsInput
  }

  export type StockMovementUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    orderId?: string | null
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
  }

  export type StockMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: OrderUpdateOneWithoutStockMoveemntsNestedInput
  }

  export type StockMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StockMovementCreateManyInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    orderId?: string | null
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
  }

  export type StockMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StockMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    remittance?: RemittanceCreateNestedOneWithoutOrdersInput
    stockMoveemnts?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    remittanceId?: string | null
    stockMoveemnts?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    remittance?: RemittanceUpdateOneWithoutOrdersNestedInput
    stockMoveemnts?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
    stockMoveemnts?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    remittanceId?: string | null
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RemittanceCreateInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    orders?: OrderCreateNestedManyWithoutRemittanceInput
    bankTransactions?: BankTransactionCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    orders?: OrderUncheckedCreateNestedManyWithoutRemittanceInput
    bankTransactions?: BankTransactionUncheckedCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUpdateManyWithoutRemittanceNestedInput
    bankTransactions?: BankTransactionUpdateManyWithoutRemittanceNestedInput
  }

  export type RemittanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUncheckedUpdateManyWithoutRemittanceNestedInput
    bankTransactions?: BankTransactionUncheckedUpdateManyWithoutRemittanceNestedInput
  }

  export type RemittanceCreateManyInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
  }

  export type RemittanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RemittanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    bankTransaction?: BankTransactionCreateNestedOneWithoutExpenseInput
    founderLoan?: FounderLoanTransactionCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    bankTransaction?: BankTransactionUncheckedCreateNestedOneWithoutExpenseInput
    founderLoan?: FounderLoanTransactionUncheckedCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    bankTransaction?: BankTransactionUpdateOneWithoutExpenseNestedInput
    founderLoan?: FounderLoanTransactionUpdateOneWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    bankTransaction?: BankTransactionUncheckedUpdateOneWithoutExpenseNestedInput
    founderLoan?: FounderLoanTransactionUncheckedUpdateOneWithoutExpenseNestedInput
  }

  export type ExpenseCreateManyInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BankTransactionCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    note?: string | null
    remittance?: RemittanceCreateNestedOneWithoutBankTransactionsInput
    expense?: ExpenseCreateNestedOneWithoutBankTransactionInput
    founderLoan?: FounderLoanTransactionCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    remittanceId?: string | null
    expenseId?: string | null
    note?: string | null
    founderLoan?: FounderLoanTransactionUncheckedCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    remittance?: RemittanceUpdateOneWithoutBankTransactionsNestedInput
    expense?: ExpenseUpdateOneWithoutBankTransactionNestedInput
    founderLoan?: FounderLoanTransactionUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    founderLoan?: FounderLoanTransactionUncheckedUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    remittanceId?: string | null
    expenseId?: string | null
    note?: string | null
  }

  export type BankTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FounderLoanTransactionCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    note?: string | null
    expense?: ExpenseCreateNestedOneWithoutFounderLoanInput
    bankTransaction?: BankTransactionCreateNestedOneWithoutFounderLoanInput
  }

  export type FounderLoanTransactionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    expenseId?: string | null
    bankTransactionId?: string | null
    note?: string | null
  }

  export type FounderLoanTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    expense?: ExpenseUpdateOneWithoutFounderLoanNestedInput
    bankTransaction?: BankTransactionUpdateOneWithoutFounderLoanNestedInput
  }

  export type FounderLoanTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FounderLoanTransactionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    expenseId?: string | null
    bankTransactionId?: string | null
    note?: string | null
  }

  export type FounderLoanTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FounderLoanTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StockCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrder
    lastPurchasePrice?: SortOrder
    reorderPoint?: SortOrder
    reorderQuantity?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrder
    lastPurchasePrice?: SortOrder
    reorderPoint?: SortOrder
    reorderQuantity?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrder
    lastPurchasePrice?: SortOrder
    reorderPoint?: SortOrder
    reorderQuantity?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrder
    lastPurchasePrice?: SortOrder
    reorderPoint?: SortOrder
    reorderQuantity?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    quantityOnHand?: SortOrder
    quantityReserved?: SortOrder
    quantity?: SortOrder
    averageCost?: SortOrder
    lastPurchasePrice?: SortOrder
    reorderPoint?: SortOrder
    reorderQuantity?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStockMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeFilter<$PrismaModel> | $Enums.StockMovementType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type StockMovementOrderIdTypeCompoundUniqueInput = {
    orderId: string
    type: $Enums.StockMovementType
  }

  export type StockMovementCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    orderId?: SortOrder
    notes?: SortOrder
    isReservation?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type StockMovementAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type StockMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    orderId?: SortOrder
    notes?: SortOrder
    isReservation?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type StockMovementMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    orderId?: SortOrder
    notes?: SortOrder
    isReservation?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type StockMovementSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    totalCost?: SortOrder
  }

  export type EnumStockMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumStockMovementTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type RemittanceNullableScalarRelationFilter = {
    is?: RemittanceWhereInput | null
    isNot?: RemittanceWhereInput | null
  }

  export type StockMovementListRelationFilter = {
    every?: StockMovementWhereInput
    some?: StockMovementWhereInput
    none?: StockMovementWhereInput
  }

  export type StockMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnedAt?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    city?: SortOrder
    address?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    comboDetails?: SortOrder
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrder
    actualPaidPrice?: SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
    type?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    remittanceId?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrder
    actualPaidPrice?: SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnedAt?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    city?: SortOrder
    address?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    comboDetails?: SortOrder
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrder
    actualPaidPrice?: SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
    type?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    remittanceId?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    returnedAt?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    city?: SortOrder
    address?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    comboDetails?: SortOrder
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrder
    actualPaidPrice?: SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
    type?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    notes?: SortOrder
    remittanceId?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    quantity?: SortOrder
    expectedPrice?: SortOrder
    cashCollected?: SortOrder
    actualPaidPrice?: SortOrder
    productCost?: SortOrder
    shippingFee?: SortOrder
    additionalCosts?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type BankTransactionListRelationFilter = {
    every?: BankTransactionWhereInput
    some?: BankTransactionWhereInput
    none?: BankTransactionWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RemittanceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    totalAmount?: SortOrder
    bankReference?: SortOrder
    dateReceived?: SortOrder
    notes?: SortOrder
  }

  export type RemittanceAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
  }

  export type RemittanceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    totalAmount?: SortOrder
    bankReference?: SortOrder
    dateReceived?: SortOrder
    notes?: SortOrder
  }

  export type RemittanceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    totalAmount?: SortOrder
    bankReference?: SortOrder
    dateReceived?: SortOrder
    notes?: SortOrder
  }

  export type RemittanceSumOrderByAggregateInput = {
    totalAmount?: SortOrder
  }

  export type EnumExpenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseType | EnumExpenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseTypeFilter<$PrismaModel> | $Enums.ExpenseType
  }

  export type BankTransactionNullableScalarRelationFilter = {
    is?: BankTransactionWhereInput | null
    isNot?: BankTransactionWhereInput | null
  }

  export type FounderLoanTransactionNullableScalarRelationFilter = {
    is?: FounderLoanTransactionWhereInput | null
    isNot?: FounderLoanTransactionWhereInput | null
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isVirtual?: SortOrder
    paidFromBank?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
    month?: SortOrder
    year?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isVirtual?: SortOrder
    paidFromBank?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isVirtual?: SortOrder
    paidFromBank?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
    month?: SortOrder
    year?: SortOrder
  }

  export type EnumExpenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseType | EnumExpenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseTypeFilter<$PrismaModel>
    _max?: NestedEnumExpenseTypeFilter<$PrismaModel>
  }

  export type EnumBankTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BankTransactionType | EnumBankTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBankTransactionTypeFilter<$PrismaModel> | $Enums.BankTransactionType
  }

  export type ExpenseNullableScalarRelationFilter = {
    is?: ExpenseWhereInput | null
    isNot?: ExpenseWhereInput | null
  }

  export type BankTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    remittanceId?: SortOrder
    expenseId?: SortOrder
    note?: SortOrder
  }

  export type BankTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BankTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    remittanceId?: SortOrder
    expenseId?: SortOrder
    note?: SortOrder
  }

  export type BankTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    remittanceId?: SortOrder
    expenseId?: SortOrder
    note?: SortOrder
  }

  export type BankTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumBankTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BankTransactionType | EnumBankTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBankTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.BankTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBankTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumBankTransactionTypeFilter<$PrismaModel>
  }

  export type EnumFounderLoanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FounderLoanType | EnumFounderLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFounderLoanTypeFilter<$PrismaModel> | $Enums.FounderLoanType
  }

  export type FounderLoanTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    expenseId?: SortOrder
    bankTransactionId?: SortOrder
    note?: SortOrder
  }

  export type FounderLoanTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FounderLoanTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    expenseId?: SortOrder
    bankTransactionId?: SortOrder
    note?: SortOrder
  }

  export type FounderLoanTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    expenseId?: SortOrder
    bankTransactionId?: SortOrder
    note?: SortOrder
  }

  export type FounderLoanTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumFounderLoanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FounderLoanType | EnumFounderLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFounderLoanTypeWithAggregatesFilter<$PrismaModel> | $Enums.FounderLoanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFounderLoanTypeFilter<$PrismaModel>
    _max?: NestedEnumFounderLoanTypeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderCreateNestedOneWithoutStockMoveemntsInput = {
    create?: XOR<OrderCreateWithoutStockMoveemntsInput, OrderUncheckedCreateWithoutStockMoveemntsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockMoveemntsInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumStockMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockMovementType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrderUpdateOneWithoutStockMoveemntsNestedInput = {
    create?: XOR<OrderCreateWithoutStockMoveemntsInput, OrderUncheckedCreateWithoutStockMoveemntsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockMoveemntsInput
    upsert?: OrderUpsertWithoutStockMoveemntsInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStockMoveemntsInput, OrderUpdateWithoutStockMoveemntsInput>, OrderUncheckedUpdateWithoutStockMoveemntsInput>
  }

  export type RemittanceCreateNestedOneWithoutOrdersInput = {
    create?: XOR<RemittanceCreateWithoutOrdersInput, RemittanceUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RemittanceCreateOrConnectWithoutOrdersInput
    connect?: RemittanceWhereUniqueInput
  }

  export type StockMovementCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type RemittanceUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<RemittanceCreateWithoutOrdersInput, RemittanceUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RemittanceCreateOrConnectWithoutOrdersInput
    upsert?: RemittanceUpsertWithoutOrdersInput
    disconnect?: RemittanceWhereInput | boolean
    delete?: RemittanceWhereInput | boolean
    connect?: RemittanceWhereUniqueInput
    update?: XOR<XOR<RemittanceUpdateToOneWithWhereWithoutOrdersInput, RemittanceUpdateWithoutOrdersInput>, RemittanceUncheckedUpdateWithoutOrdersInput>
  }

  export type StockMovementUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutOrderInput | StockMovementUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutOrderInput | StockMovementUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutOrderInput | StockMovementUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutOrderInput | StockMovementUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutOrderInput | StockMovementUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutOrderInput | StockMovementUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderCreateNestedManyWithoutRemittanceInput = {
    create?: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput> | OrderCreateWithoutRemittanceInput[] | OrderUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRemittanceInput | OrderCreateOrConnectWithoutRemittanceInput[]
    createMany?: OrderCreateManyRemittanceInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BankTransactionCreateNestedManyWithoutRemittanceInput = {
    create?: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput> | BankTransactionCreateWithoutRemittanceInput[] | BankTransactionUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: BankTransactionCreateOrConnectWithoutRemittanceInput | BankTransactionCreateOrConnectWithoutRemittanceInput[]
    createMany?: BankTransactionCreateManyRemittanceInputEnvelope
    connect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutRemittanceInput = {
    create?: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput> | OrderCreateWithoutRemittanceInput[] | OrderUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRemittanceInput | OrderCreateOrConnectWithoutRemittanceInput[]
    createMany?: OrderCreateManyRemittanceInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BankTransactionUncheckedCreateNestedManyWithoutRemittanceInput = {
    create?: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput> | BankTransactionCreateWithoutRemittanceInput[] | BankTransactionUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: BankTransactionCreateOrConnectWithoutRemittanceInput | BankTransactionCreateOrConnectWithoutRemittanceInput[]
    createMany?: BankTransactionCreateManyRemittanceInputEnvelope
    connect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutRemittanceNestedInput = {
    create?: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput> | OrderCreateWithoutRemittanceInput[] | OrderUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRemittanceInput | OrderCreateOrConnectWithoutRemittanceInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRemittanceInput | OrderUpsertWithWhereUniqueWithoutRemittanceInput[]
    createMany?: OrderCreateManyRemittanceInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRemittanceInput | OrderUpdateWithWhereUniqueWithoutRemittanceInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRemittanceInput | OrderUpdateManyWithWhereWithoutRemittanceInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BankTransactionUpdateManyWithoutRemittanceNestedInput = {
    create?: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput> | BankTransactionCreateWithoutRemittanceInput[] | BankTransactionUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: BankTransactionCreateOrConnectWithoutRemittanceInput | BankTransactionCreateOrConnectWithoutRemittanceInput[]
    upsert?: BankTransactionUpsertWithWhereUniqueWithoutRemittanceInput | BankTransactionUpsertWithWhereUniqueWithoutRemittanceInput[]
    createMany?: BankTransactionCreateManyRemittanceInputEnvelope
    set?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    disconnect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    delete?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    connect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    update?: BankTransactionUpdateWithWhereUniqueWithoutRemittanceInput | BankTransactionUpdateWithWhereUniqueWithoutRemittanceInput[]
    updateMany?: BankTransactionUpdateManyWithWhereWithoutRemittanceInput | BankTransactionUpdateManyWithWhereWithoutRemittanceInput[]
    deleteMany?: BankTransactionScalarWhereInput | BankTransactionScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutRemittanceNestedInput = {
    create?: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput> | OrderCreateWithoutRemittanceInput[] | OrderUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRemittanceInput | OrderCreateOrConnectWithoutRemittanceInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRemittanceInput | OrderUpsertWithWhereUniqueWithoutRemittanceInput[]
    createMany?: OrderCreateManyRemittanceInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRemittanceInput | OrderUpdateWithWhereUniqueWithoutRemittanceInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRemittanceInput | OrderUpdateManyWithWhereWithoutRemittanceInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BankTransactionUncheckedUpdateManyWithoutRemittanceNestedInput = {
    create?: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput> | BankTransactionCreateWithoutRemittanceInput[] | BankTransactionUncheckedCreateWithoutRemittanceInput[]
    connectOrCreate?: BankTransactionCreateOrConnectWithoutRemittanceInput | BankTransactionCreateOrConnectWithoutRemittanceInput[]
    upsert?: BankTransactionUpsertWithWhereUniqueWithoutRemittanceInput | BankTransactionUpsertWithWhereUniqueWithoutRemittanceInput[]
    createMany?: BankTransactionCreateManyRemittanceInputEnvelope
    set?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    disconnect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    delete?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    connect?: BankTransactionWhereUniqueInput | BankTransactionWhereUniqueInput[]
    update?: BankTransactionUpdateWithWhereUniqueWithoutRemittanceInput | BankTransactionUpdateWithWhereUniqueWithoutRemittanceInput[]
    updateMany?: BankTransactionUpdateManyWithWhereWithoutRemittanceInput | BankTransactionUpdateManyWithWhereWithoutRemittanceInput[]
    deleteMany?: BankTransactionScalarWhereInput | BankTransactionScalarWhereInput[]
  }

  export type BankTransactionCreateNestedOneWithoutExpenseInput = {
    create?: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutExpenseInput
    connect?: BankTransactionWhereUniqueInput
  }

  export type FounderLoanTransactionCreateNestedOneWithoutExpenseInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutExpenseInput
    connect?: FounderLoanTransactionWhereUniqueInput
  }

  export type BankTransactionUncheckedCreateNestedOneWithoutExpenseInput = {
    create?: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutExpenseInput
    connect?: BankTransactionWhereUniqueInput
  }

  export type FounderLoanTransactionUncheckedCreateNestedOneWithoutExpenseInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutExpenseInput
    connect?: FounderLoanTransactionWhereUniqueInput
  }

  export type EnumExpenseTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExpenseType
  }

  export type BankTransactionUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutExpenseInput
    upsert?: BankTransactionUpsertWithoutExpenseInput
    disconnect?: BankTransactionWhereInput | boolean
    delete?: BankTransactionWhereInput | boolean
    connect?: BankTransactionWhereUniqueInput
    update?: XOR<XOR<BankTransactionUpdateToOneWithWhereWithoutExpenseInput, BankTransactionUpdateWithoutExpenseInput>, BankTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type FounderLoanTransactionUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutExpenseInput
    upsert?: FounderLoanTransactionUpsertWithoutExpenseInput
    disconnect?: FounderLoanTransactionWhereInput | boolean
    delete?: FounderLoanTransactionWhereInput | boolean
    connect?: FounderLoanTransactionWhereUniqueInput
    update?: XOR<XOR<FounderLoanTransactionUpdateToOneWithWhereWithoutExpenseInput, FounderLoanTransactionUpdateWithoutExpenseInput>, FounderLoanTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type BankTransactionUncheckedUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutExpenseInput
    upsert?: BankTransactionUpsertWithoutExpenseInput
    disconnect?: BankTransactionWhereInput | boolean
    delete?: BankTransactionWhereInput | boolean
    connect?: BankTransactionWhereUniqueInput
    update?: XOR<XOR<BankTransactionUpdateToOneWithWhereWithoutExpenseInput, BankTransactionUpdateWithoutExpenseInput>, BankTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type FounderLoanTransactionUncheckedUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutExpenseInput
    upsert?: FounderLoanTransactionUpsertWithoutExpenseInput
    disconnect?: FounderLoanTransactionWhereInput | boolean
    delete?: FounderLoanTransactionWhereInput | boolean
    connect?: FounderLoanTransactionWhereUniqueInput
    update?: XOR<XOR<FounderLoanTransactionUpdateToOneWithWhereWithoutExpenseInput, FounderLoanTransactionUpdateWithoutExpenseInput>, FounderLoanTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type RemittanceCreateNestedOneWithoutBankTransactionsInput = {
    create?: XOR<RemittanceCreateWithoutBankTransactionsInput, RemittanceUncheckedCreateWithoutBankTransactionsInput>
    connectOrCreate?: RemittanceCreateOrConnectWithoutBankTransactionsInput
    connect?: RemittanceWhereUniqueInput
  }

  export type ExpenseCreateNestedOneWithoutBankTransactionInput = {
    create?: XOR<ExpenseCreateWithoutBankTransactionInput, ExpenseUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutBankTransactionInput
    connect?: ExpenseWhereUniqueInput
  }

  export type FounderLoanTransactionCreateNestedOneWithoutBankTransactionInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutBankTransactionInput
    connect?: FounderLoanTransactionWhereUniqueInput
  }

  export type FounderLoanTransactionUncheckedCreateNestedOneWithoutBankTransactionInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutBankTransactionInput
    connect?: FounderLoanTransactionWhereUniqueInput
  }

  export type EnumBankTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.BankTransactionType
  }

  export type RemittanceUpdateOneWithoutBankTransactionsNestedInput = {
    create?: XOR<RemittanceCreateWithoutBankTransactionsInput, RemittanceUncheckedCreateWithoutBankTransactionsInput>
    connectOrCreate?: RemittanceCreateOrConnectWithoutBankTransactionsInput
    upsert?: RemittanceUpsertWithoutBankTransactionsInput
    disconnect?: RemittanceWhereInput | boolean
    delete?: RemittanceWhereInput | boolean
    connect?: RemittanceWhereUniqueInput
    update?: XOR<XOR<RemittanceUpdateToOneWithWhereWithoutBankTransactionsInput, RemittanceUpdateWithoutBankTransactionsInput>, RemittanceUncheckedUpdateWithoutBankTransactionsInput>
  }

  export type ExpenseUpdateOneWithoutBankTransactionNestedInput = {
    create?: XOR<ExpenseCreateWithoutBankTransactionInput, ExpenseUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutBankTransactionInput
    upsert?: ExpenseUpsertWithoutBankTransactionInput
    disconnect?: ExpenseWhereInput | boolean
    delete?: ExpenseWhereInput | boolean
    connect?: ExpenseWhereUniqueInput
    update?: XOR<XOR<ExpenseUpdateToOneWithWhereWithoutBankTransactionInput, ExpenseUpdateWithoutBankTransactionInput>, ExpenseUncheckedUpdateWithoutBankTransactionInput>
  }

  export type FounderLoanTransactionUpdateOneWithoutBankTransactionNestedInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutBankTransactionInput
    upsert?: FounderLoanTransactionUpsertWithoutBankTransactionInput
    disconnect?: FounderLoanTransactionWhereInput | boolean
    delete?: FounderLoanTransactionWhereInput | boolean
    connect?: FounderLoanTransactionWhereUniqueInput
    update?: XOR<XOR<FounderLoanTransactionUpdateToOneWithWhereWithoutBankTransactionInput, FounderLoanTransactionUpdateWithoutBankTransactionInput>, FounderLoanTransactionUncheckedUpdateWithoutBankTransactionInput>
  }

  export type FounderLoanTransactionUncheckedUpdateOneWithoutBankTransactionNestedInput = {
    create?: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
    connectOrCreate?: FounderLoanTransactionCreateOrConnectWithoutBankTransactionInput
    upsert?: FounderLoanTransactionUpsertWithoutBankTransactionInput
    disconnect?: FounderLoanTransactionWhereInput | boolean
    delete?: FounderLoanTransactionWhereInput | boolean
    connect?: FounderLoanTransactionWhereUniqueInput
    update?: XOR<XOR<FounderLoanTransactionUpdateToOneWithWhereWithoutBankTransactionInput, FounderLoanTransactionUpdateWithoutBankTransactionInput>, FounderLoanTransactionUncheckedUpdateWithoutBankTransactionInput>
  }

  export type ExpenseCreateNestedOneWithoutFounderLoanInput = {
    create?: XOR<ExpenseCreateWithoutFounderLoanInput, ExpenseUncheckedCreateWithoutFounderLoanInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutFounderLoanInput
    connect?: ExpenseWhereUniqueInput
  }

  export type BankTransactionCreateNestedOneWithoutFounderLoanInput = {
    create?: XOR<BankTransactionCreateWithoutFounderLoanInput, BankTransactionUncheckedCreateWithoutFounderLoanInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutFounderLoanInput
    connect?: BankTransactionWhereUniqueInput
  }

  export type EnumFounderLoanTypeFieldUpdateOperationsInput = {
    set?: $Enums.FounderLoanType
  }

  export type ExpenseUpdateOneWithoutFounderLoanNestedInput = {
    create?: XOR<ExpenseCreateWithoutFounderLoanInput, ExpenseUncheckedCreateWithoutFounderLoanInput>
    connectOrCreate?: ExpenseCreateOrConnectWithoutFounderLoanInput
    upsert?: ExpenseUpsertWithoutFounderLoanInput
    disconnect?: ExpenseWhereInput | boolean
    delete?: ExpenseWhereInput | boolean
    connect?: ExpenseWhereUniqueInput
    update?: XOR<XOR<ExpenseUpdateToOneWithWhereWithoutFounderLoanInput, ExpenseUpdateWithoutFounderLoanInput>, ExpenseUncheckedUpdateWithoutFounderLoanInput>
  }

  export type BankTransactionUpdateOneWithoutFounderLoanNestedInput = {
    create?: XOR<BankTransactionCreateWithoutFounderLoanInput, BankTransactionUncheckedCreateWithoutFounderLoanInput>
    connectOrCreate?: BankTransactionCreateOrConnectWithoutFounderLoanInput
    upsert?: BankTransactionUpsertWithoutFounderLoanInput
    disconnect?: BankTransactionWhereInput | boolean
    delete?: BankTransactionWhereInput | boolean
    connect?: BankTransactionWhereUniqueInput
    update?: XOR<XOR<BankTransactionUpdateToOneWithWhereWithoutFounderLoanInput, BankTransactionUpdateWithoutFounderLoanInput>, BankTransactionUncheckedUpdateWithoutFounderLoanInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStockMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeFilter<$PrismaModel> | $Enums.StockMovementType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumStockMovementTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumExpenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseType | EnumExpenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseTypeFilter<$PrismaModel> | $Enums.ExpenseType
  }

  export type NestedEnumExpenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseType | EnumExpenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseType[] | ListEnumExpenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseTypeFilter<$PrismaModel>
    _max?: NestedEnumExpenseTypeFilter<$PrismaModel>
  }

  export type NestedEnumBankTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BankTransactionType | EnumBankTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBankTransactionTypeFilter<$PrismaModel> | $Enums.BankTransactionType
  }

  export type NestedEnumBankTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BankTransactionType | EnumBankTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BankTransactionType[] | ListEnumBankTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBankTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.BankTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBankTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumBankTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumFounderLoanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FounderLoanType | EnumFounderLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFounderLoanTypeFilter<$PrismaModel> | $Enums.FounderLoanType
  }

  export type NestedEnumFounderLoanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FounderLoanType | EnumFounderLoanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FounderLoanType[] | ListEnumFounderLoanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFounderLoanTypeWithAggregatesFilter<$PrismaModel> | $Enums.FounderLoanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFounderLoanTypeFilter<$PrismaModel>
    _max?: NestedEnumFounderLoanTypeFilter<$PrismaModel>
  }

  export type OrderCreateWithoutStockMoveemntsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    remittance?: RemittanceCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutStockMoveemntsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    remittanceId?: string | null
  }

  export type OrderCreateOrConnectWithoutStockMoveemntsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStockMoveemntsInput, OrderUncheckedCreateWithoutStockMoveemntsInput>
  }

  export type OrderUpsertWithoutStockMoveemntsInput = {
    update: XOR<OrderUpdateWithoutStockMoveemntsInput, OrderUncheckedUpdateWithoutStockMoveemntsInput>
    create: XOR<OrderCreateWithoutStockMoveemntsInput, OrderUncheckedCreateWithoutStockMoveemntsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStockMoveemntsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStockMoveemntsInput, OrderUncheckedUpdateWithoutStockMoveemntsInput>
  }

  export type OrderUpdateWithoutStockMoveemntsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    remittance?: RemittanceUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutStockMoveemntsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RemittanceCreateWithoutOrdersInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    bankTransactions?: BankTransactionCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceUncheckedCreateWithoutOrdersInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    bankTransactions?: BankTransactionUncheckedCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceCreateOrConnectWithoutOrdersInput = {
    where: RemittanceWhereUniqueInput
    create: XOR<RemittanceCreateWithoutOrdersInput, RemittanceUncheckedCreateWithoutOrdersInput>
  }

  export type StockMovementCreateWithoutOrderInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
  }

  export type StockMovementUncheckedCreateWithoutOrderInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
  }

  export type StockMovementCreateOrConnectWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput>
  }

  export type StockMovementCreateManyOrderInputEnvelope = {
    data: StockMovementCreateManyOrderInput | StockMovementCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type RemittanceUpsertWithoutOrdersInput = {
    update: XOR<RemittanceUpdateWithoutOrdersInput, RemittanceUncheckedUpdateWithoutOrdersInput>
    create: XOR<RemittanceCreateWithoutOrdersInput, RemittanceUncheckedCreateWithoutOrdersInput>
    where?: RemittanceWhereInput
  }

  export type RemittanceUpdateToOneWithWhereWithoutOrdersInput = {
    where?: RemittanceWhereInput
    data: XOR<RemittanceUpdateWithoutOrdersInput, RemittanceUncheckedUpdateWithoutOrdersInput>
  }

  export type RemittanceUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bankTransactions?: BankTransactionUpdateManyWithoutRemittanceNestedInput
  }

  export type RemittanceUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bankTransactions?: BankTransactionUncheckedUpdateManyWithoutRemittanceNestedInput
  }

  export type StockMovementUpsertWithWhereUniqueWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutOrderInput, StockMovementUncheckedUpdateWithoutOrderInput>
    create: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutOrderInput, StockMovementUncheckedUpdateWithoutOrderInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutOrderInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutOrderInput>
  }

  export type StockMovementScalarWhereInput = {
    AND?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    OR?: StockMovementScalarWhereInput[]
    NOT?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    productId?: StringFilter<"StockMovement"> | string
    productTitle?: StringFilter<"StockMovement"> | string
    quantity?: IntFilter<"StockMovement"> | number
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    isReservation?: BoolFilter<"StockMovement"> | boolean
    unitCost?: FloatNullableFilter<"StockMovement"> | number | null
    totalCost?: FloatNullableFilter<"StockMovement"> | number | null
  }

  export type OrderCreateWithoutRemittanceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    stockMoveemnts?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutRemittanceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
    stockMoveemnts?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutRemittanceInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput>
  }

  export type OrderCreateManyRemittanceInputEnvelope = {
    data: OrderCreateManyRemittanceInput | OrderCreateManyRemittanceInput[]
    skipDuplicates?: boolean
  }

  export type BankTransactionCreateWithoutRemittanceInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    note?: string | null
    expense?: ExpenseCreateNestedOneWithoutBankTransactionInput
    founderLoan?: FounderLoanTransactionCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionUncheckedCreateWithoutRemittanceInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    expenseId?: string | null
    note?: string | null
    founderLoan?: FounderLoanTransactionUncheckedCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionCreateOrConnectWithoutRemittanceInput = {
    where: BankTransactionWhereUniqueInput
    create: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput>
  }

  export type BankTransactionCreateManyRemittanceInputEnvelope = {
    data: BankTransactionCreateManyRemittanceInput | BankTransactionCreateManyRemittanceInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutRemittanceInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutRemittanceInput, OrderUncheckedUpdateWithoutRemittanceInput>
    create: XOR<OrderCreateWithoutRemittanceInput, OrderUncheckedCreateWithoutRemittanceInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutRemittanceInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutRemittanceInput, OrderUncheckedUpdateWithoutRemittanceInput>
  }

  export type OrderUpdateManyWithWhereWithoutRemittanceInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutRemittanceInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    returnedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    city?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    productId?: StringNullableFilter<"Order"> | string | null
    productTitle?: StringNullableFilter<"Order"> | string | null
    comboDetails?: StringNullableFilter<"Order"> | string | null
    quantity?: IntFilter<"Order"> | number
    expectedPrice?: FloatFilter<"Order"> | number
    cashCollected?: FloatNullableFilter<"Order"> | number | null
    actualPaidPrice?: FloatNullableFilter<"Order"> | number | null
    productCost?: FloatFilter<"Order"> | number
    shippingFee?: FloatFilter<"Order"> | number
    additionalCosts?: FloatFilter<"Order"> | number
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    notes?: StringNullableFilter<"Order"> | string | null
    remittanceId?: StringNullableFilter<"Order"> | string | null
  }

  export type BankTransactionUpsertWithWhereUniqueWithoutRemittanceInput = {
    where: BankTransactionWhereUniqueInput
    update: XOR<BankTransactionUpdateWithoutRemittanceInput, BankTransactionUncheckedUpdateWithoutRemittanceInput>
    create: XOR<BankTransactionCreateWithoutRemittanceInput, BankTransactionUncheckedCreateWithoutRemittanceInput>
  }

  export type BankTransactionUpdateWithWhereUniqueWithoutRemittanceInput = {
    where: BankTransactionWhereUniqueInput
    data: XOR<BankTransactionUpdateWithoutRemittanceInput, BankTransactionUncheckedUpdateWithoutRemittanceInput>
  }

  export type BankTransactionUpdateManyWithWhereWithoutRemittanceInput = {
    where: BankTransactionScalarWhereInput
    data: XOR<BankTransactionUpdateManyMutationInput, BankTransactionUncheckedUpdateManyWithoutRemittanceInput>
  }

  export type BankTransactionScalarWhereInput = {
    AND?: BankTransactionScalarWhereInput | BankTransactionScalarWhereInput[]
    OR?: BankTransactionScalarWhereInput[]
    NOT?: BankTransactionScalarWhereInput | BankTransactionScalarWhereInput[]
    id?: StringFilter<"BankTransaction"> | string
    createdAt?: DateTimeFilter<"BankTransaction"> | Date | string
    amount?: FloatFilter<"BankTransaction"> | number
    type?: EnumBankTransactionTypeFilter<"BankTransaction"> | $Enums.BankTransactionType
    remittanceId?: StringNullableFilter<"BankTransaction"> | string | null
    expenseId?: StringNullableFilter<"BankTransaction"> | string | null
    note?: StringNullableFilter<"BankTransaction"> | string | null
  }

  export type BankTransactionCreateWithoutExpenseInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    note?: string | null
    remittance?: RemittanceCreateNestedOneWithoutBankTransactionsInput
    founderLoan?: FounderLoanTransactionCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionUncheckedCreateWithoutExpenseInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    remittanceId?: string | null
    note?: string | null
    founderLoan?: FounderLoanTransactionUncheckedCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionCreateOrConnectWithoutExpenseInput = {
    where: BankTransactionWhereUniqueInput
    create: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
  }

  export type FounderLoanTransactionCreateWithoutExpenseInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    note?: string | null
    bankTransaction?: BankTransactionCreateNestedOneWithoutFounderLoanInput
  }

  export type FounderLoanTransactionUncheckedCreateWithoutExpenseInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    bankTransactionId?: string | null
    note?: string | null
  }

  export type FounderLoanTransactionCreateOrConnectWithoutExpenseInput = {
    where: FounderLoanTransactionWhereUniqueInput
    create: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
  }

  export type BankTransactionUpsertWithoutExpenseInput = {
    update: XOR<BankTransactionUpdateWithoutExpenseInput, BankTransactionUncheckedUpdateWithoutExpenseInput>
    create: XOR<BankTransactionCreateWithoutExpenseInput, BankTransactionUncheckedCreateWithoutExpenseInput>
    where?: BankTransactionWhereInput
  }

  export type BankTransactionUpdateToOneWithWhereWithoutExpenseInput = {
    where?: BankTransactionWhereInput
    data: XOR<BankTransactionUpdateWithoutExpenseInput, BankTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type BankTransactionUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    remittance?: RemittanceUpdateOneWithoutBankTransactionsNestedInput
    founderLoan?: FounderLoanTransactionUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionUncheckedUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    founderLoan?: FounderLoanTransactionUncheckedUpdateOneWithoutBankTransactionNestedInput
  }

  export type FounderLoanTransactionUpsertWithoutExpenseInput = {
    update: XOR<FounderLoanTransactionUpdateWithoutExpenseInput, FounderLoanTransactionUncheckedUpdateWithoutExpenseInput>
    create: XOR<FounderLoanTransactionCreateWithoutExpenseInput, FounderLoanTransactionUncheckedCreateWithoutExpenseInput>
    where?: FounderLoanTransactionWhereInput
  }

  export type FounderLoanTransactionUpdateToOneWithWhereWithoutExpenseInput = {
    where?: FounderLoanTransactionWhereInput
    data: XOR<FounderLoanTransactionUpdateWithoutExpenseInput, FounderLoanTransactionUncheckedUpdateWithoutExpenseInput>
  }

  export type FounderLoanTransactionUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    bankTransaction?: BankTransactionUpdateOneWithoutFounderLoanNestedInput
  }

  export type FounderLoanTransactionUncheckedUpdateWithoutExpenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RemittanceCreateWithoutBankTransactionsInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    orders?: OrderCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceUncheckedCreateWithoutBankTransactionsInput = {
    id?: string
    createdAt?: Date | string
    totalAmount: number
    bankReference?: string | null
    dateReceived?: Date | string
    notes?: string | null
    orders?: OrderUncheckedCreateNestedManyWithoutRemittanceInput
  }

  export type RemittanceCreateOrConnectWithoutBankTransactionsInput = {
    where: RemittanceWhereUniqueInput
    create: XOR<RemittanceCreateWithoutBankTransactionsInput, RemittanceUncheckedCreateWithoutBankTransactionsInput>
  }

  export type ExpenseCreateWithoutBankTransactionInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    founderLoan?: FounderLoanTransactionCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutBankTransactionInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    founderLoan?: FounderLoanTransactionUncheckedCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutBankTransactionInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutBankTransactionInput, ExpenseUncheckedCreateWithoutBankTransactionInput>
  }

  export type FounderLoanTransactionCreateWithoutBankTransactionInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    note?: string | null
    expense?: ExpenseCreateNestedOneWithoutFounderLoanInput
  }

  export type FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.FounderLoanType
    expenseId?: string | null
    note?: string | null
  }

  export type FounderLoanTransactionCreateOrConnectWithoutBankTransactionInput = {
    where: FounderLoanTransactionWhereUniqueInput
    create: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
  }

  export type RemittanceUpsertWithoutBankTransactionsInput = {
    update: XOR<RemittanceUpdateWithoutBankTransactionsInput, RemittanceUncheckedUpdateWithoutBankTransactionsInput>
    create: XOR<RemittanceCreateWithoutBankTransactionsInput, RemittanceUncheckedCreateWithoutBankTransactionsInput>
    where?: RemittanceWhereInput
  }

  export type RemittanceUpdateToOneWithWhereWithoutBankTransactionsInput = {
    where?: RemittanceWhereInput
    data: XOR<RemittanceUpdateWithoutBankTransactionsInput, RemittanceUncheckedUpdateWithoutBankTransactionsInput>
  }

  export type RemittanceUpdateWithoutBankTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUpdateManyWithoutRemittanceNestedInput
  }

  export type RemittanceUncheckedUpdateWithoutBankTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bankReference?: NullableStringFieldUpdateOperationsInput | string | null
    dateReceived?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    orders?: OrderUncheckedUpdateManyWithoutRemittanceNestedInput
  }

  export type ExpenseUpsertWithoutBankTransactionInput = {
    update: XOR<ExpenseUpdateWithoutBankTransactionInput, ExpenseUncheckedUpdateWithoutBankTransactionInput>
    create: XOR<ExpenseCreateWithoutBankTransactionInput, ExpenseUncheckedCreateWithoutBankTransactionInput>
    where?: ExpenseWhereInput
  }

  export type ExpenseUpdateToOneWithWhereWithoutBankTransactionInput = {
    where?: ExpenseWhereInput
    data: XOR<ExpenseUpdateWithoutBankTransactionInput, ExpenseUncheckedUpdateWithoutBankTransactionInput>
  }

  export type ExpenseUpdateWithoutBankTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    founderLoan?: FounderLoanTransactionUpdateOneWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutBankTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    founderLoan?: FounderLoanTransactionUncheckedUpdateOneWithoutExpenseNestedInput
  }

  export type FounderLoanTransactionUpsertWithoutBankTransactionInput = {
    update: XOR<FounderLoanTransactionUpdateWithoutBankTransactionInput, FounderLoanTransactionUncheckedUpdateWithoutBankTransactionInput>
    create: XOR<FounderLoanTransactionCreateWithoutBankTransactionInput, FounderLoanTransactionUncheckedCreateWithoutBankTransactionInput>
    where?: FounderLoanTransactionWhereInput
  }

  export type FounderLoanTransactionUpdateToOneWithWhereWithoutBankTransactionInput = {
    where?: FounderLoanTransactionWhereInput
    data: XOR<FounderLoanTransactionUpdateWithoutBankTransactionInput, FounderLoanTransactionUncheckedUpdateWithoutBankTransactionInput>
  }

  export type FounderLoanTransactionUpdateWithoutBankTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    expense?: ExpenseUpdateOneWithoutFounderLoanNestedInput
  }

  export type FounderLoanTransactionUncheckedUpdateWithoutBankTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumFounderLoanTypeFieldUpdateOperationsInput | $Enums.FounderLoanType
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateWithoutFounderLoanInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    bankTransaction?: BankTransactionCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseUncheckedCreateWithoutFounderLoanInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.ExpenseType
    amount: number
    description?: string | null
    reference?: string | null
    month: number
    year: number
    isVirtual?: boolean
    paidFromBank?: boolean
    bankTransaction?: BankTransactionUncheckedCreateNestedOneWithoutExpenseInput
  }

  export type ExpenseCreateOrConnectWithoutFounderLoanInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutFounderLoanInput, ExpenseUncheckedCreateWithoutFounderLoanInput>
  }

  export type BankTransactionCreateWithoutFounderLoanInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    note?: string | null
    remittance?: RemittanceCreateNestedOneWithoutBankTransactionsInput
    expense?: ExpenseCreateNestedOneWithoutBankTransactionInput
  }

  export type BankTransactionUncheckedCreateWithoutFounderLoanInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    remittanceId?: string | null
    expenseId?: string | null
    note?: string | null
  }

  export type BankTransactionCreateOrConnectWithoutFounderLoanInput = {
    where: BankTransactionWhereUniqueInput
    create: XOR<BankTransactionCreateWithoutFounderLoanInput, BankTransactionUncheckedCreateWithoutFounderLoanInput>
  }

  export type ExpenseUpsertWithoutFounderLoanInput = {
    update: XOR<ExpenseUpdateWithoutFounderLoanInput, ExpenseUncheckedUpdateWithoutFounderLoanInput>
    create: XOR<ExpenseCreateWithoutFounderLoanInput, ExpenseUncheckedCreateWithoutFounderLoanInput>
    where?: ExpenseWhereInput
  }

  export type ExpenseUpdateToOneWithWhereWithoutFounderLoanInput = {
    where?: ExpenseWhereInput
    data: XOR<ExpenseUpdateWithoutFounderLoanInput, ExpenseUncheckedUpdateWithoutFounderLoanInput>
  }

  export type ExpenseUpdateWithoutFounderLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    bankTransaction?: BankTransactionUpdateOneWithoutExpenseNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutFounderLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumExpenseTypeFieldUpdateOperationsInput | $Enums.ExpenseType
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    paidFromBank?: BoolFieldUpdateOperationsInput | boolean
    bankTransaction?: BankTransactionUncheckedUpdateOneWithoutExpenseNestedInput
  }

  export type BankTransactionUpsertWithoutFounderLoanInput = {
    update: XOR<BankTransactionUpdateWithoutFounderLoanInput, BankTransactionUncheckedUpdateWithoutFounderLoanInput>
    create: XOR<BankTransactionCreateWithoutFounderLoanInput, BankTransactionUncheckedCreateWithoutFounderLoanInput>
    where?: BankTransactionWhereInput
  }

  export type BankTransactionUpdateToOneWithWhereWithoutFounderLoanInput = {
    where?: BankTransactionWhereInput
    data: XOR<BankTransactionUpdateWithoutFounderLoanInput, BankTransactionUncheckedUpdateWithoutFounderLoanInput>
  }

  export type BankTransactionUpdateWithoutFounderLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    remittance?: RemittanceUpdateOneWithoutBankTransactionsNestedInput
    expense?: ExpenseUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionUncheckedUpdateWithoutFounderLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    remittanceId?: NullableStringFieldUpdateOperationsInput | string | null
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockMovementCreateManyOrderInput = {
    id?: string
    createdAt?: Date | string
    productId: string
    productTitle: string
    quantity: number
    type: $Enums.StockMovementType
    notes?: string | null
    isReservation?: boolean
    unitCost?: number | null
    totalCost?: number | null
  }

  export type StockMovementUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StockMovementUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StockMovementUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isReservation?: BoolFieldUpdateOperationsInput | boolean
    unitCost?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCost?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderCreateManyRemittanceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    returnedAt?: Date | string | null
    customerName: string
    customerPhone: string
    city?: string | null
    address?: string | null
    productId?: string | null
    productTitle?: string | null
    comboDetails?: string | null
    quantity?: number
    expectedPrice?: number
    cashCollected?: number | null
    actualPaidPrice?: number | null
    productCost?: number
    shippingFee?: number
    additionalCosts?: number
    type?: $Enums.OrderType
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    notes?: string | null
  }

  export type BankTransactionCreateManyRemittanceInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    type: $Enums.BankTransactionType
    expenseId?: string | null
    note?: string | null
  }

  export type OrderUpdateWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stockMoveemnts?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    stockMoveemnts?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comboDetails?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expectedPrice?: FloatFieldUpdateOperationsInput | number
    cashCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    actualPaidPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productCost?: FloatFieldUpdateOperationsInput | number
    shippingFee?: FloatFieldUpdateOperationsInput | number
    additionalCosts?: FloatFieldUpdateOperationsInput | number
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankTransactionUpdateWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    note?: NullableStringFieldUpdateOperationsInput | string | null
    expense?: ExpenseUpdateOneWithoutBankTransactionNestedInput
    founderLoan?: FounderLoanTransactionUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionUncheckedUpdateWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    founderLoan?: FounderLoanTransactionUncheckedUpdateOneWithoutBankTransactionNestedInput
  }

  export type BankTransactionUncheckedUpdateManyWithoutRemittanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumBankTransactionTypeFieldUpdateOperationsInput | $Enums.BankTransactionType
    expenseId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}