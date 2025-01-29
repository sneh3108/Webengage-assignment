 const  express = require('express');
const  axios = require('axios');
const  createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const  path = require('path');

const app = express();
const PORT = 3000;

// Route to generate CSV

 app.get('/generate-csv',  async (req, res) => {
    try {

        // Fetch data from APIs
        const [users, posts, comments] = await Promise.all([
             axios.get('https://jsonplaceholder.typicode.com/users'),
             axios.get('https://jsonplaceholder.typicode.com/posts'),
             axios.get('https://jsonplaceholder.typicode.com/comments'),

        ]);

        // Extract required data

        const userData = users.data.map(user => ({ id: user.id, name: user.name }));

        const postData = posts.data.map(post => ({ id: post.id, title: post.title }));

        const commentData = comments.data.map(comment => ({ id: comment.id, body: comment.body }));

        // Combine data into a single array

        const combinedData = userData.map(user => {

            const post = postData.find(p => p.id === user.id);

            const comment = commentData.find(c => c.id === user.id);

            return {

                name: user.name,
                title: post ? post.title : 'N/A',
                body: comment ? comment.body : 'N/A',
            };

        });

        // Define CSV file path
         const csvFilePath = path.join(__dirname, 'output', 'data.csv');

        // Ensure the output directory exists

        if (!fs.existsSync(path.join(__dirname, 'output'))) {
            fs.mkdirSync(path.join(__dirname, 'output'));
        }

        // Write data to CSV

        const csvWriter = createCsvWriter({

            path: csvFilePath,
            header: [
                { id: 'name', title: 'Name' },
                { id: 'title', title: 'Title' },
                { id: 'body', title: 'Body' },
            ],

        });


        await csvWriter.writeRecords(combinedData);


        // Respond with the path to the CSV file

        res.status(200).json({ message: 'CSV file generated successfully!', path: csvFilePath });

    } catch (error) {
        console.error('Error generating CSV:', error);

        res.status(500).json({ error: 'Failed to generate CSV file.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});