const handleCreateJournal = async (
    title,
    author,
    description,
    image,
    pdf,
    ) => {
    await addDoc(collection(db, 'auctions'), {
        title: title,
        description: description,
        author: author,
        image: image,
        category: categorySelected,
        createdBy: JSON.parse(user).user_uid,
        endDate: endDate,
        createdAt: new Date().getTime(),
    })
        .then(() => {
            Alert.alert(
                'Info',
                'Your Journal was created',
                [{
                    text: 'Dismiss',
                }]
                )
        })
        
        .catch((e) => Alert.alert(
            'Info',
            'An error has occured!',
            [{
                text: 'Dismiss',
                onPress: console.error(e)
            }]
        ))
}

const getJournals = async () => {
    const alljournals = [];
    const querySnapshot = await getDocs(collection(db, "journals"));
  
    querySnapshot.forEach((doc) => {
      alljournals.push(doc.data());
    });
  
    return alljournals;
  };