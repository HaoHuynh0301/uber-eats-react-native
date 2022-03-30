const sliceName = 'noti';

export const displayMsgRequest = (msg) => {
  return {
    type: `${sliceName}/displayMsgRequest`,
    msg
  }
}

export const hideMsgRequest = () => {
  return {
    type: `${sliceName}/hideMsgRequest`,
  }
}