export class StatusCode {
  static OK = 200
  static Created = 201
  static Accepted = 202
  static NonAuthoritativeInformation = 203
  static NoContent = 204
  static ResetContent = 205
  static PartialContent = 206
  static MultiStatus = 207
  static AlreadyReported = 208
  static IMUsed = 226
  static MultipleChoices = 300
  static MovedPermanently = 301
  static Found = 302
  static SeeOther = 303
  static NotModified = 304
  static UseProxy = 305
  static TemporaryRedirect = 307
  static PermanentRedirect = 308
  static BadRequest = 400
  static Unauthorized = 401
  static PaymentRequired = 402
  static Forbidden = 403
  static NotFound = 404
  static MethodNotAllowed = 405
  static NotAcceptable = 406
  static ProxyAuthenticationRequired = 407
  static RequestTimeout = 408
  static Conflict = 409
  static Gone = 410
  static LengthRequired = 411
  static PreconditionFailed = 412
  static PayloadTooLarge = 413
  static URITooLong = 414
  static UnsupportedMediaType = 415
  static RangeNotSatisfiable = 416
  static ExpectationFailed = 417
  static MisdirectedRequest = 421
  static UnprocessableEntity = 422
  static Locked = 423
  static FailedDependency = 424
  static TooEarly = 425
  static UpgradeRequired = 426
  static PreconditionRequired = 428
  static TooManyRequests = 429
  static RequestHeaderFieldsTooLarge = 431
  static UnavailableForLegalReasons = 451
  static InternalServerError = 500
  static NotImplemented = 501
  static BadGateway = 502
  static ServiceUnavailable = 503
  static GatewayTimeout = 504
  static HTTPVersionNotSupported = 505
  static VariantAlsoNegotiates = 506
  static InsufficientStorage = 507
  static LoopDetected = 508
  static NotExtended = 510
  static NetworkAuthenticationRequired = 511

  /**
 * Representa os tipos de erro possíveis na aplicação.
 * @enum {string}
 */
  static errorType = Object.freeze({

    BadRequest: 'BadRequest',
    Unauthorized: 'Unauthorized',
    PaymentRequired: 'PaymentRequired',
    Forbidden: 'Forbidden',
    NotFound: 'NotFound',
    MethodNotAllowed: 'MethodNotAllowed',
    NotAcceptable: 'NotAcceptable',
    ProxyAuthenticationRequired: 'ProxyAuthenticationRequired',
    RequestTimeout: 'RequestTimeout',
    Conflict: 'Conflict',
    Gone: 'Gone',
    LengthRequired: 'LengthRequired',
    PreconditionFailed: 'PreconditionFailed',
    PayloadTooLarge: 'PayloadTooLarge',
    URITooLong: 'URITooLong',
    UnsupportedMediaType: 'UnsupportedMediaType',
    RangeNotSatisfiable: 'RangeNotSatisfiable',
    ExpectationFailed: 'ExpectationFailed',
    MisdirectedRequest: 'MisdirectedRequest',
    UnprocessableEntity: 'UnprocessableEntity',
    Locked: 'Locked',
    FailedDependency: 'FailedDependency',
    TooEarly: 'TooEarly',
    UpgradeRequired: 'UpgradeRequired',
    PreconditionRequired: 'PreconditionRequired',
    TooManyRequests: 'TooManyRequests',
    RequestHeaderFieldsTooLarge: 'RequestHeaderFieldsTooLarge',
    UnavailableForLegalReasons: 'UnavailableForLegalReasons',
    InternalServerError: 'Internal Server Error',
    NotImplemented: 'NotImplemented',
    BadGateway: 'BadGateway',
    ServiceUnavailable: 'ServiceUnavailable',
    GatewayTimeout: 'GatewayTimeout',
    HTTPVersionNotSupported: 'HTTPVersionNotSupported',
    VariantAlsoNegotiates: 'VariantAlsoNegotiates',
    InsufficientStorage: 'InsufficientStorage',
    LoopDetected: 'LoopDetected',
    NotExtended: 'NotExtended',
    NetworkAuthenticationRequired: 'NetworkAuthenticationRequired',

    GenericError: 'GenericError',
    ParseError: 'ParseError',
    ResourceEmpty: 'ResourceEmpty',
    ResourceUnavailable: 'ResourceUnavailable',
    TimeOut: 'TimeOut',
    GenericErrorMessage: 'Generic Error'
  })

  static DefaultErrorType = {
    400: StatusCode.errorType.BadRequest,
    401: StatusCode.errorType.Unauthorized,
    402: StatusCode.errorType.PaymentRequired,
    403: StatusCode.errorType.Forbidden,
    404: StatusCode.errorType.NotFound,
    405: StatusCode.errorType.MethodNotAllowed,
    406: StatusCode.errorType.NotAcceptable,
    407: StatusCode.errorType.ProxyAuthenticationRequired,
    408: StatusCode.errorType.RequestTimeout,
    409: StatusCode.errorType.Conflict,
    410: StatusCode.errorType.Gone,
    411: StatusCode.errorType.LengthRequired,
    412: StatusCode.errorType.PreconditionFailed,
    413: StatusCode.errorType.PayloadTooLarge,
    414: StatusCode.errorType.URITooLong,
    415: StatusCode.errorType.UnsupportedMediaType,
    416: StatusCode.errorType.RangeNotSatisfiable,
    417: StatusCode.errorType.ExpectationFailed,
    421: StatusCode.errorType.MisdirectedRequest,
    422: StatusCode.errorType.UnprocessableEntity,
    423: StatusCode.errorType.Locked,
    424: StatusCode.errorType.FailedDependency,
    425: StatusCode.errorType.TooEarly,
    426: StatusCode.errorType.UpgradeRequired,
    428: StatusCode.errorType.PreconditionRequired,
    429: StatusCode.errorType.TooManyRequests,
    431: StatusCode.errorType.RequestHeaderFieldsTooLarge,
    451: StatusCode.errorType.UnavailableForLegalReasons,
    500: StatusCode.errorType.InternalServerError,
    501: StatusCode.errorType.NotImplemented,
    502: StatusCode.errorType.BadGateway,
    503: StatusCode.errorType.ServiceUnavailable,
    504: StatusCode.errorType.GatewayTimeout,
    505: StatusCode.errorType.HTTPVersionNotSupported,
    506: StatusCode.errorType.VariantAlsoNegotiates,
    507: StatusCode.errorType.InsufficientStorage,
    508: StatusCode.errorType.LoopDetected,
    510: StatusCode.errorType.NotExtended,
    511: StatusCode.errorType.NetworkAuthenticationRequired
  }
}
