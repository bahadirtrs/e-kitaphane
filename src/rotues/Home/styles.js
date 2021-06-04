import {StyleSheet} from "react-native";
import { COLORS } from "../../constants/theme";
export default ()=>{
    return StyleSheet.create({
            categoriesView:{
            width:90, 
            height:90, 
            backgroundColor:COLORS.backgroundColor,
            margin:5,
            marginLeft:5, 
            justifyContent:'center', 
            alignItems:'center', 
            borderRadius:8,
            shadowColor:COLORS.shadow,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            },
        })
}

