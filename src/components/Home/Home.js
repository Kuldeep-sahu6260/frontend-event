import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper,AppBar,Button,TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChipInput from "material-ui-chip-input";
import {useHistory,useLocation} from "react-router-dom";
import useStyles from './styles'
import { getPosts ,getPostsBySearch} from '../../actions/posts';
import Paginations from "../Paginations";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

function useQuery (){
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search,setSearch] = useState("");
  const [tags,SetTags] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost =()=>{
    if(search.trim() || tags){
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)// change for url
        dispatch(getPostsBySearch({search,tags : tags.join(',')}))///join tags from ,
    }else{
      history.push('/');
    }
  }

  const handleKeyPress =(e)=>{
    if (e.keyCode === 13) {
      searchPost();
    }
  }
  const handleAddChip = (tag)=> SetTags([...tags,tag]);// spread preves tag and add new
  const handleDeleteChip = (tagToDelete) => SetTags(tags.filter((tag)=> tag !== tagToDelete)); 

    return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
          <Grid item xs={12} sm={6} md={9} >
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
              <TextField name="search" variant="outlined" label="Search Event" onKeyDown={handleKeyPress} fullWidth value={search} onChange={(e)=> setSearch(e.target.value) } />
              <ChipInput style={{ margin :'10px 0'}} value={tags}  onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags"
                variant="outlined" />
                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" >Search</Button>
              </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}  />
            {(!searchQuery && !tags.length) && (

            <Paper elevation={5} className={classes.pagination} >
            <Paginations page={page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;