/* The feature that I wanted to add was a feature that
   would allow the user to preview the track.
	 I didn't finish this Feature Request because I got stuck on a few things while making it,
	 I have to keep up with a lot of things in, and I'm pretty busy these days.
	 Whoever reviews my project, can you please tell me how I could get the feature to work.

	 I'm sorry for not completing the Feature Request.

	 The Component for the feature is called "TrackPreview"*/

import React from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.state = {
        	searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: []};
	}

    addTrack(track) {
		if (this.state.playlistTracks.every(plTrack => plTrack.id !== track.id)) {
			let newPlaylistTracks = this.state.playlistTracks.concat(track);
			this.setState({playlistTracks: newPlaylistTracks});
		}
	}

    removeTrack(track) {
		let newPlaylistTracks = this.state.playlistTracks.filter(plTrack =>
			plTrack.id !== track.id);
		this.setState({playlistTracks: newPlaylistTracks});
	}

    updatePlaylistName(newName) {
		this.setState({playlistName: newName});
	}

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        if (this.state.playlistName && trackURIs && trackURIs.length > 0) {
			Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
				// TODO may be show a beautiful notification?
				console.log(`new playlist with '${this.state.playlistName}' and ${trackURIs.length} songs successful saved.`);
				this.setState({playlistName: 'New Playlist', playlistTracks: []});
			});
		}
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(tracks =>
            this.setState({searchResults: tracks}));
	}

    render() {
		return (
		  <div>
			  <h1>Ja<span className="highlight">mmm</span>ing</h1>
			  <div className="App">
              <SearchBar onSearch={this.search}/>
				<div className="App-playlist">
				  <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
				  <Playlist tracks={this.state.playlistTracks} title={this.state.playlistName} onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
				</div>
			  </div>
			</div>
		);
	}
}

export default App;
