const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/helio-aegis';

async function updateNavigation() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Navigation = mongoose.connection.collection('navigations');
    
    const result = await Navigation.updateOne(
      {},
      {
        $set: {
          logo: {
            imageUrl: '/images/heliosngrlogo.png',
            altText: 'Helios NRG'
          },
          siteTitle: 'Helios NRG'
        }
      }
    );

    console.log('✅ Navigation updated:', result.modifiedCount, 'document(s) modified');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error updating navigation:', error);
    process.exit(1);
  }
}

updateNavigation();
