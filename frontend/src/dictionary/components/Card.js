import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import {style} from "./Card.style";
import VoiceTranslation from "../../shared/VoiceTranslation";
import Grid from "@material-ui/core/Grid/Grid";
import {Icon} from "@mdi/react";
import {mdiDelete} from "@mdi/js";
import Tooltip from "../../shared/Tooltip";
import Translation from "./Translation";
import cutImg from "../../assets/shadowcut.png";
import placeholderImg from "../../assets/placeholder.png";
import AddTranslation from "./AddTranslation";

const Card = ({classes, word, deleteTranslation, deleteCard, ...props}) => {

  const [hover, setHover] = useState(false);

  return (
    <Grid container direction={"column"} className={classes.wrapper}>

      <div className={classes.wordImg}>
        <img height={"100%"} width={"100%"} src={word.image ? (word.image.rootPath + word.image.relativePath) : placeholderImg}/>
        <div className={classes.cut}>
          <img src={cutImg} className={classes.cutImg}/>
        </div>
      </div>

      <Tooltip title={"Удалить карточку"}>
        <Icon path={mdiDelete} className={classes.deleteIcon} size={1} onClick={() => deleteCard(word.id)}/>
      </Tooltip>
      <span className={classes.word}>{word.word.text}</span>
      <Grid item style={{marginBottom: 15}}>
        <VoiceTranslation word={word.word} withLabel classes={{icon: classes.sound}}/>
      </Grid>

      <Grid item style={{width: "100%"}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Grid container direction={"column"}>
          {word.userTranslations.map((t) => (
            <Translation value={t.translation} onDelete={() => deleteTranslation(word.id, t.id)}
                         deletable={word.userTranslations.length > 1}/>
          ))}
        </Grid>

        <AddTranslation hover={hover}/>
      </Grid>

      <div>
        {word.context}
      </div>
    </Grid>
  )
};

export default withStyles(style)(Card);