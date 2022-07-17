const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ImgSize = {
  WIDTH: 70,
  HEIGHT: 70
};
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarUpload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#avatar-preview');

const adUpload = document.querySelector('#images');
const adPreviewWrapper = document.querySelector('.ad-form__photo');

const getImgUrl = (fileInput) => {
  const image = fileInput.files[0];
  const imageFileName = image.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => imageFileName.endsWith(it));

  if (matches) {
    return URL.createObjectURL(image);
  }

  throw new Error('Возможный формат .png или .jpeg');
};

const generateAdImgTag = (imgUrl) => {
  const img = document.createElement('img');
  img.src = imgUrl;
  img.width = ImgSize.WIDTH;
  img.height = ImgSize.HEIGHT;
  return img;

};

avatarUpload.addEventListener('change', () => {
  avatarPreview.src = getImgUrl(avatarUpload);
});

adUpload.addEventListener('change', () => {
  const adImg = generateAdImgTag(getImgUrl(adUpload));
  adPreviewWrapper.append(adImg);
});

const resetAdPhoto = () => {
  adPreviewWrapper.innerHTML = '';
};

const resetAvatar = () => {
  avatarPreview.src = DEFAULT_AVATAR;
};

export {resetAdPhoto, resetAvatar};
