const SSQ_CH = [
    {
        title: "Section A - Speech",
        scenarios: [
            {
                // first question
                description:
                    "You are talking with your Mum or Dad and there is a TV on in the same room. Without turning the TV down, can you understand what your Mum or Dad is saying to you?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand someone speaking when the TV is on",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "You are talking with one person in a quiet room with carpet. Can you understand what the other person is saying to you?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand someone speaking in a quiet room?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "You are in a group of about five people, sitting round a table. It is a quiet place. You can see everyone else in the group. Can you understand what the group is talking about?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a group conversation in a quiet room?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "You are in a group of about five people, sitting round a table. It is a noisy room, like a busy classroom where students are moving around and talking. You can see everyone in the group around your table. Can you understand what the group is talking about?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a group conversation in a noisy room?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation? ",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "You are talking with one person. There is noise in the background, like a tap running or a fan. Can you understand what the person is saying to you?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a person speaking when there’s a constant background noise?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "You are in a group of about five people, sitting round a table. It is a noisy room, such as a busy classroom where students are moving around and talking. You cannot see everyone in the group around your table. Can you understand what the group is talking about?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a group conversation in a noisy room when you can’t see everyone?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // seventh question
                description:
                    "You are talking to someone in a place where there are a lot of echoes, like a school assembly hall. Can you understand what the person is saying",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a person speaking when there’s a lot of echoes?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eighth question
                description:
                    "You are talking to one person in a room in which there are many other people talking. Can you understand what the other person is saying",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a person speaking when there are a lot of other people talking in the background?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // ninth question
                description:
                    "You are talking with a group of friends and everyone is taking turns to talk. Can you understand what is being said without missing the start each time a new person begins to talk?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a group of people taking turns to talk?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // tenth question
                description:
                    "Is it easy for you to understand a friend or your Mum or Dad on the phone?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to understand a person speaking on the phone?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Section B - Spatial",
        scenarios: [
            {
                // first question
                description:
                    "You are outside in a place you haven’t been before. There is a loud noise from a lawnmower or aeroplane that you can’t see. Can you tell right awaywhere the sound is coming from?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell where a loud and constant noise is coming from?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "You are in a group of about 5 people, sitting round a table. You cannot see everyone in the group. Can you tell where any person is as soon as theystart talking?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell where the person is who is speaking in a group conversation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "You are sitting between two friends. One of them starts to talk. Can you tell straight away if it is the friend on the left or on the right who is talking, without having to look?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are sitting between two people talking?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "You are at home and it is quiet. Your Mum or Dad calls you from another room. Will you know where they are without having to look?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to find someone calling you from another room?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "You are outside. A dog barks loudly. Can you tell straight away where the dog is, without having to look?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell where a short loud noise is coming from?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "You are standing on the footpath of a busy street. You can hear a bus or truck. Can you tell right away where it is coming from before you see it?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell where a bus or truck is coming from on a busy street",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // seventh question
                description:
                    "You can hear a bus or truck. Can you tell whether it is coming towards you or moving away just from the sound?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell if a bus or truck you can hear is coming towards you or moving away?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eighth question
                description:
                    "You can hear voices or footsteps. Can you tell if the person is coming towards you or moving away just by the sound?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell if footsteps or voices you can hear are coming towards you or moving away?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // ninth question
                description:
                    "You can hear a bus or truck. Just from the sound, can you tell which direction it is moving (for example, from your left to your right, or fromyour right to your left)?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to use just the sound to tell which direction a bus or truck is moving (forexample, from your left to your right)",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // tenth question
                description:
                    "You can hear voices or footsteps. Just from the sound, can you tell which direction the person is moving (for example, from your left to your right, or from your right to your left)?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to use just the sound to tell which direction voices or footsteps are moving (for example, from your left to your right?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eleventh question
                description:
                    "You can hear a bus or truck. Can you tell how far away it is just from the sound?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to tell from the sound how far away a bus or truck is?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // twelfth question
                description:
                    "You can hear voices or footsteps. Can you tell how far away the person is just from the sound?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are trying to are trying to tell how far away a person is just from the sound of footsteps or voices?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Section C - Other Qualities",
        scenarios: [
            {
                // first question
                description:
                    "You are in a room with music playing. Someone starts to talk. Will you know that someone has started speaking (even though you may not know what they are saying)?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are already listening to a sound but you need to notice if someone starts speaking?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "Think about when you can hear two noises at once, for example, water running into the bath and a radio playing, OR a truck driving past and the sound of knocking at the door. Do you hear these as two separate sounds?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to know that the sound you can hear is two separate sounds?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "Do you know which person in your family is talking just by the sound of their voice, even if you can’t see them?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to identify someone by just their voice?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "You can hear a song you know being played. Is it easy for you to tell what song it is just by listening?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you wouldlike to recognise a song just by sound?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "Can you tell the difference between noises that are a bit the same, like a car versus a bus, OR the tap running and a fan?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to tell the difference between two sounds that are a bit the same?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "Can you tell how someone feels (happy, angry, sad) just by listening to their voice?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to tell how someone feels just by their voice?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // seventh question
                description:
                    "Do you have to try very hard when listening to someone or something?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Try very hard", "Don't try hard"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to tell how hard it is when listening to someone or something?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eighth question
                description:
                    "When you are travelling in the front seat of the car can you easily understand what the driver is saying to you?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which you are travelling in the front seat of the car and it would be useful to understand the driver?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // ninth question
                description:
                    "Do you have to try hard to understand what other people are saying?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Try very hard", "Don't try hard"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to tell what other people are saying?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // tenth question
                description:
                    "Is it easy for you to ignore other sounds when trying to listen to something?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not easy", "Easy"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for you, in which it would be useful to ignore other sounds when trying to listen to something?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for you to have, or to learn, the listening skills needed for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
];

/******************************************************************************/

const SSQ_P = [
    {
        title: "Section A - Speech",
        scenarios: [
            {
                // first question
                description:
                    "You are talking with your child and there is a TV on in the same room. Without turning the TV down, can your child follow what you’re saying?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she needs to follow what someone is saying with the TV on in the same room?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "You are talking with your child in a quiet, carpeted lounge-room. Can your child follow what you’re saying?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she is trying to follow a speaker in a quiet room without reverberation (echoes)?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "Your child is in a group of about five people, sitting round a table. It is an otherwise quiet place. Your child can see everyone else in the group. Can your child follow the conversation?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of group conversation in a quiet place occur for your child?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "Your child is in a group of about five people, sitting round a table. It is a noisy room, such as a busy restaurant or large family gathering at home. Your child can see everyone else in the group. Can your child follow theconversation?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of group conversation in a noisy room occur for your child?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "You are talking with your child. There is a continuous background noise, such as a fan or running water. Can your child follow what you say?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she is trying to follow a speaker in a continuous background noise?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "Your child is in a group of about five people, sitting round a table. It is a noisy room, such as a busy restaurant or large family gathering at home. Your child cannot see everyone else in the group. Can your child follow the conversation?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of group conversation in a noisy room occur for your child?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // seventh question
                description:
                    "You are talking to your child in a place where there are a lot of echoes, such as a school assembly hall or indoor swimming pool. Can your child follow what you say?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she is trying to follow a speaker in a place with echoes?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eighth question
                description:
                    "You are talking to your child in a room in which there are many other people talking. Can your child follow what you say?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she is trying to follow a speaker in a room with lots of other people talking?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // ninth question
                description:
                    "Can your child easily have a conversation with a familiar person on the telephone?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this situation occur for your child, in which he/she is trying to have a conversation on the telephone with a familiar person?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Section B - Spatial",
        scenarios: [
            {
                // first question
                description:
                    "Your child is outdoors in an unfamiliar place. A loud constant noise, such as from a lawnmower, aeroplane or power tool, can be heard. The source of the sound can’t be seen. Can your child tell right away where the sound is coming from?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to be able to tell where a sound is coming from when outside?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "Your child is sitting around a table with several people. Your child cannot see everyone. Can your child tell where any person is as soon as they start speaking?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to know where a speaker is as soon as they start speaking?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "Your child is sitting in between yourself and another person. One of you starts to speak. Can your child tell right away whether it is the person on their left or their right who is speaking, without having to look?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to locate the speaker as being on the left or on the right?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "You and your child are in different rooms at home. It is quiet. If your childhears you call out their name, will he/she know where in the house you are?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she needs to know from which room a someone is calling",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "Your child is outside. A dog barks loudly. Can your child tell immediately where it is, without having to look?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to know where the source was for this type of sound?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "Your child is standing on the footpath of a busy street. Can your child hear right away which direction a bus or truck is coming from before they see it?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to know from which direction a vehicle was approaching?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Section C - Other Qualities",
        scenarios: [
            {
                // first question
                description:
                    "Think about when there are two noises in or around the home at once, for example, water running into the bath and a radio playing, OR a truck driving past and the sound of knocking at the door. Is your child able to identify thetwo separate sounds?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to identify two separate sounds?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // second question
                description:
                    "You are in a room with your child and music is playing. Will your child be aware of your voice if you start speaking? Note that the child does not have to understand what you say.",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which he/she is already listening to a sound, but needs to be aware when someone starts speaking?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to be able to have, or to develop, the listening skills required for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // third question
                description:
                    "Can your child recognise family members or other very familiar people by the sound of each one’s voice without seeing them?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this situation occur for your child, in which it would be useful to recognise people by the sound of their voice?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required for this situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fourth question
                description:
                    "Can your child distinguish between different pieces of familiar music? Note that producing words or movements relevant to a song can indicate recognition.",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful (or enjoyable) to be able to distinguish between pieces of music?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required for this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // fifth question
                description:
                    "Can your child tell the difference between sounds that are somewhat similar, for example, a car versus a bus, OR water boiling in a pot versus food cooking in a frypan?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to be able to tell the difference between sounds that are somewhat similar?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required for this situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // sixth question
                description:
                    "Can your child easily judge another person’s mood from the sound of their voice?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not at all", "Perfectly"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to judge mood from a person’s voice?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required for this situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // seventh question
                description:
                    "Does your child have to put in a lot of effort to hear what is being said in conversation with others?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["A lot of effort", "No effort"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to hear what is being said in conversation with others?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
            {
                // eighth question
                description:
                    "Can your child easily ignore other sounds when trying to listen to something?",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Not easily ignore", "Easily ignore"],
                    },
                    {
                        description:
                            "How often does this type of situation occur for your child, in which it would be useful to ignore another sound in order to listen to something?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very often (4 or more times in a week)",
                            "Often (1 to 3 times in a week)",
                            "Not often (1 to 2 times in a month)",
                        ],
                    },
                    {
                        description:
                            "How important do you think it is for your child to have, or to develop, the listening skills required in this type of situation?",
                        isMCQ: true,
                        MCQOptions: [
                            "Very important",
                            "Important",
                            "Only a little bit important",
                            "Not important",
                        ],
                    },
                ],
            },
        ],
    },
];

module.exports.SSQ_CH = SSQ_CH;
module.exports.SSQ_P = SSQ_P;
