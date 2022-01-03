import 'dart:async';

import 'lo_field_state.dart';
import 'lo_status.dart';

typedef FieldsMap = Map<String, LoFieldState>;
typedef ValMap = Map<String, dynamic>;
typedef ErrMap = Map<String, String?>;

typedef StatusCheckFunc = bool Function(LoStatus);
typedef SetErrFunc = void Function(ErrMap);
typedef SubmitFunc = FutureOr<bool?>? Function(ValMap, SetErrFunc);

extension ValMapX on ValMap {
  /// Shorthand for using "as" to cast the dynamic value
  T get<T>(String key) => this[key] as T;
}

extension FieldsMapX on FieldsMap {
  /// Shorthand for using "as" to cast the dynamic value
  LoFieldState<T> get<T>(String key) {
    return this[key]! as LoFieldState<T>;
  }

  ValMap getValues() {
    return map((key, field) => MapEntry(key, field.value));
  }

  List<LoStatus> getStatuses() {
    return values.map((field) => field.status).toList();
  }
}