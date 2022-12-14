import React, { useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Input,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { app } from '../../firebase.config';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { classes } from '../../components/resp';
import { saveDataToFirestore } from '../../hooks/useFirebase';
import { useMenuContext } from '../../provider/Menu';
import RecipeModal from './recipe/RecipeModal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import styles from './addModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const AddModal = (props) => {
  const { recipesData, setRecipesData, addedFood, setAddedFood, setIsSpinning, setIsDownloaded } = useMenuContext();
  const [imageData, setImageData] = useState({
    url: '',
    file: '',
    imageName: '',
  });
  const [openRecipeModal, setOpenRecipeModal] = useState(false);
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));
  const between600_900 = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  //========Image file input handler===============
  const imgUploadHandler = (e) => {
    const file = e.target.files[0];
    const fileName = `${file.name}-${uuidv4()}`;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageData({
        ...imageData,
        url: event.target.result,
        imageName: fileName,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  };

  //========Multiple inputs handler===============
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddedFood({ ...addedFood, [name]: value.trim() });
  };

  //=======Triggers Recipe Add Modal===========
  const RecipeModalHandler = () => {
    setRecipesData({});
    setOpenRecipeModal(true);
  };

  //========Set recipes to=============
  const RecipeModalClose = () => {
    setOpenRecipeModal(false);
    const length = Object.values(recipesData).length;
    if (length === 2)
      setAddedFood({
        ...addedFood,
        recipes: [...addedFood.recipes, recipesData],
      });
  };

  //=========Remove recipes from its array===========
  const deleteRecipes = (recipeIndex) => {
    //1. Filter recipes array by selected recipe's index
    const filtered = addedFood.recipes.filter((recipe, idx) => idx !== recipeIndex);
    //2. Update recipes array
    setAddedFood({
      ...addedFood,
      recipes: [...filtered],
    });
  };

  //================Check if all inputs are valid before saving=========
  const onSubmitHandler = async () => {
    const foodValues = Object.values(addedFood);
    const isEmptyInputs = foodValues.some((value) => value === '');
    const isEmptyRecipe = _.isEmpty(addedFood.recipes);
    const isEmptyImg = imageData.file === '';

    if (!isEmptyInputs && !isEmptyRecipe && !isEmptyImg) {
      props.onCloseHandler(false);
      setIsSpinning(true);

      const isUploaded = await imageUploadToFirestore();
      if (isUploaded) {
        setIsSpinning(false);
        setIsDownloaded(true);

        toast.success('?????? ???????????????? ?????????????????? ????????????????????????!');
        saveDataToFirestore('menu', addedFood);
      }
    } else toast.error('???? ?????? ???????????????? ?????????? ???????????? ?????????????? ????!');
  };

  //===================Upload image to firebase/STORE=======
  const imageUploadToFirestore = async () => {
    // Store image in firebase
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, 'images/' + imageData.imageName);
      await uploadBytes(storageRef, imageData.file);

      const downloadURL = await getDownloadURL(storageRef);
      //add new key (URL) to addedFood object.
      addedFood.URL = downloadURL;
      setAddedFood({ ...addedFood });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return (
    <div>
      <Modal open={props.onOpen} onClose={props.onCloseHandler}>
        <Box sx={classes.foodAddContainer}>
          {/* ================Food add section=========== */}
          <Stack direction="column" justifyContent="center">
            {/* HEADER */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" pb={2} mx={5}>
              <Box component="span" onClick={props.onCloseHandler}>
                <CloseRoundedIcon fontSize="small" />
              </Box>
              <div>
                <Typography variant="font24Bold700">???????? ?????????? </Typography>
              </div>
              <Button variant="contained" onClick={onSubmitHandler}>
                {is600px ? <SaveAsOutlinedIcon /> : '????????????????'}
              </Button>
            </Stack>
            <Divider />
            {/*=========== ADD INFOs========== */}
            <Stack direction={is600px | between600_900 ? 'column' : 'row'} mb={10}>
              <Box
                className={styles.circle}
                m={5}
                sx={imageData.url === '' ? { backgroundColor: 'background.grey' } : { backgroundColor: 'none' }}
              >
                <CardMedia src={imageData.url} component="img" sx={{ borderRadius: '50%' }} />
                {imageData.url === '' && (
                  <RestaurantRoundedIcon className={styles.foodIcon} fontSize="1" sx={{ color: '#a0a2a8' }} />
                )}

                <label
                  sx={{
                    border: `1px solid red`,
                    display: `inline-block`,
                    padding: `6px 12px`,
                    cursor: `pointer`,
                  }}
                >
                  <Input sx={{ display: 'none' }} type="file" onChange={imgUploadHandler} />
                  <CameraAltOutlinedIcon className={styles.cameraIcon} sx={{ color: 'secondary.grey' }} />
                </label>
              </Box>
              <Box className={styles.inputs} mx={10}>
                <Stack direction="column">
                  <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                    ???????????? ??????
                  </Typography>
                  <TextField placeholder="?????? ?????????? ????" name="name" onChange={inputHandler} />
                  <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                    ??????????????????????
                  </Typography>
                  <TextField variant="outlined" placeholder="?????? ?????????? ????" name="desription" onChange={inputHandler} />
                </Stack>
                <Stack direction="row">
                  <Stack mr={5} sx={{ minWidth: 200 }}>
                    <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                      ???????????? ??????
                    </Typography>
                    <TextField type="number" placeholder="??? ?????? ?????????? ????" name="price" onChange={inputHandler} />
                  </Stack>
                  <Stack>
                    <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                      ??????????
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-label">??????????</InputLabel>
                      <Select value={addedFood.category} name="category" onChange={inputHandler}>
                        <MenuItem value={'???????????? ????????'}>???????????? ????????</MenuItem>
                        <MenuItem value={'?????????????????????? ????????'}>?????????????????????? ????????</MenuItem>
                        <MenuItem value={'???????????? ????????'}>???????????? ????????</MenuItem>
                        <MenuItem value={'???????????? ???????????????? ????????'}>???????????? ???????????????? ????????</MenuItem>
                        <MenuItem value={'???????? ????????'}>???????? ????????</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack direction="column">
                  <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                    ????????
                  </Typography>
                  <TextField type="number" placeholder="?????? ?????????? ????" name="portion" onChange={inputHandler} />
                </Stack>
              </Box>
            </Stack>
            <Divider />
            {/*=========== Recipe add section ===========*/}
            <Stack direction="column" mb={10}>
              {/* header */}
              <Stack direction="row" justifyContent="space-between" m={5}>
                <Typography variant="font20Bold700">??????, ????????????????</Typography>
                <Stack
                  direction="row"
                  sx={{ backgroundColor: 'background.grey' }}
                  py={2}
                  px={4}
                  onClick={RecipeModalHandler}
                >
                  <AddRoundedIcon />
                  <Typography>?????? ??????????</Typography>
                </Stack>
              </Stack>
              {/* recipe input wrapper */}
              <Stack mx={5} direction="row" flexWrap="wrap" justifyContent="space-between">
                {/* recipe input items */}
                {addedFood.recipes.map((recipe, recipeIndex) => {
                  return (
                    <Stack direction="column" key={recipeIndex}>
                      <Typography variant="font16Bold600" color="secondary.black" mt={5} mb={2}>
                        {recipe.name}
                      </Typography>
                      <Stack direction="row">
                        <TextField placeholder={recipe.amountType} sx={{ width: 290 }} />
                        <Button onClick={() => deleteRecipes(recipeIndex)}>
                          <RemoveRoundedIcon className={styles.removeBtn} />
                        </Button>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
            <Divider />
          </Stack>
        </Box>
      </Modal>
      {/*=========== Add Recipe Modal section ===========*/}
      <RecipeModal onOpen={openRecipeModal} onOpenHandler={RecipeModalHandler} onCloseHandler={RecipeModalClose} />
    </div>
  );
};

export default AddModal;
