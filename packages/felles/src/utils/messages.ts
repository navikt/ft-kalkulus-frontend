export const isRequiredMessage = () => ([{ id: 'ValidationMessage.NotEmpty' }]);
export const minLengthMessage = (length) => ([{ id: 'ValidationMessage.MinLength' }, { length }]);
export const maxLengthMessage = (length) => ([{ id: 'ValidationMessage.MaxLength' }, { length }]);
export const invalidTextMessage = (text) => ([{ id: 'ValidationMessage.InvalidText' }, { text }]);
