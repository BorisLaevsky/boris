let rooms = {};
let currentRoom = localStorage.getItem("currentRoom") || "title";

/* -----------------------------
   LOAD ROOMS
-------------------------------- */
fetch("./data/rooms.json")
  .then(res => res.json())
  .then(data => {
    rooms = data;
    initFriendButton();
    renderRoom();
  })
  .catch(err => {
    document.getElementById("room-text").textContent =
      "ERROR: " + err.message;
    console.error(err);
  });

/* -----------------------------
   FRIEND BUTTON + INLINE BUBBLE
-------------------------------- */
let friendBtn;
let friendTextDiv;

function initFriendButton() {
  // Create friend button
  friendBtn = document.createElement("button");
  friendBtn.textContent = "Talk to my friend";
  friendBtn.id = "friend-btn";
  friendBtn.onclick = talkToFriend;

  // Add button to options div
  document.getElementById("options").after(friendBtn);

  // Create friend bubble div (hidden initially)
  friendTextDiv = document.createElement("div");
  friendTextDiv.id = "friend-text";
  friendTextDiv.style.display = "none"; // hidden initially
  friendTextDiv.innerHTML = `
    <div id="friend-bubble">
      <img id="friend-avatar" src="assets/images/ui/friend.gif" alt="Friend">
      <span id="friend-bubble-text"></span>
    </div>
  `;

  friendBtn.after(friendTextDiv);
}

/* -----------------------------
   RENDER ROOM
-------------------------------- */
function renderRoom() {
  const room = rooms[currentRoom];

  if (!room) {
    document.getElementById("room-text").textContent =
      "Room not found: " + currentRoom;
    return;
  }

  // Persist state
  localStorage.setItem("currentRoom", currentRoom);

  // Hide & clear friend bubble on room change
  if (friendTextDiv) {
    friendTextDiv.style.display = "none";
    friendTextDiv.querySelector("#friend-bubble-text").textContent = "";
  }

  // Title & text
  document.getElementById("room-title").textContent = room.title;
  document.getElementById("room-text").textContent = room.text;

  // Image
  let imgDiv = document.getElementById("room-image");
  if (!imgDiv) {
    imgDiv = document.createElement("div");
    imgDiv.id = "room-image";
    document.getElementById("screen").insertBefore(
      imgDiv,
      document.getElementById("options")
    );
  }
  imgDiv.innerHTML = "";

  if (room.image) {
    const img = document.createElement("img");
    img.src = `assets/images/works/${room.image}`;
    img.loading = "lazy";
    img.style.maxWidth = "100%";
    img.style.marginTop = "12px";

    img.onerror = () => {
      imgDiv.textContent = "Image not found: " + room.image;
    };

    imgDiv.appendChild(img);
  }

  // Options
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  if (room.options) {
    room.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.label;
      btn.onclick = () => {
        currentRoom = option.target;
        renderRoom();
      };
      optionsDiv.appendChild(btn);
    });
  }
}

/* -----------------------------
   FRIEND LOGIC (INLINE BUBBLE)
-------------------------------- */
function talkToFriend() {
  if (!friendTextDiv) return;

  let baseRoom = currentRoom;

  // Strip "_detail" suffix for friend mapping
  if (baseRoom.includes("_detail")) baseRoom = baseRoom.split("_detail")[0];

  const friendRoomKey = "friend_" + baseRoom;
  const friendRoom = rooms[friendRoomKey];

  const textSpan = friendTextDiv.querySelector("#friend-bubble-text");

  if (!friendRoom) {
    textSpan.textContent = "Your friend has nothing to say here… yet.";
    friendTextDiv.style.display = "inline-flex";
    return;
  }

  // Show friend text inline
  textSpan.textContent = friendRoom.text;
  friendTextDiv.style.display = "inline-flex";
}
