import React from "react";
import Circle from 'react-circle';
import {withTheme} from "@material-ui/core";


export const WordProgress = ({theme, progress, style, ...props}) => {
  return (<div style={{width: 30, height: 30, ...style}} {...props}>
      <Circle
        animate={true} // Boolean: Animated/Static progress
        animationDuration="1s" //String: Length of animation
        responsive={true} // Boolean: Make SVG adapt to parent size
        size={11} // Number: Defines the size of the circle.
        lineWidth={50} // Number: Defines the thickness of the circle's stroke.
        progress={progress} // Number: Update to change the progress and percentage.
        progressColor={theme.palette.success.main}  // String: Color of "progress" portion of circle.
        bgColor="whitesmoke" // String: Color of "empty" portion of circle.
        textColor={theme.palette.success.main} // String: Color of percentage text color.
        textStyle={{
          font: 'bold 5rem Helvetica, Arial, sans-serif',
        }}
        percentSpacing={3} // Number: Adjust spacing of "%" symbol and number.
        roundedStroke={true} // Boolean: Rounded/Flat line ends
        showPercentage={true} // Boolean: Show/hide percentage.
        showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
    />
  </div>)
};

export default withTheme()(WordProgress);
