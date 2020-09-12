import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const CustomAlert = ({
  show,
  message,
  onConfirmPressed,
  color = "#067042"
}) => {
  return (
    <AwesomeAlert
      show={show}
      message={message}
      showProgress={false}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={true}
      confirmButtonColor={color}
      messageStyle={{
        textAlign: "center"
      }}
      confirmButtonTextStyle={{
        fontSize: 20,
        textAlign: "center",
        top: "50%",
        marginTop: "-15%",
        marginBottom: "-25%"
      }}
      confirmButtonStyle={{ width: 100, height: 50 }}
      confirmText="OK"
      onConfirmPressed={onConfirmPressed}
    />
  );
};

export default CustomAlert;
