

export function calculateSkillMatch(
    candidateSkills,
    requiredSkills
) {
    const candidate = candidateSkills.map((skill) =>
    skill.toLowerCase()
    );

    const required = requiredSkills.map((skill) =>
    skill.toLowerCase()
    );


    const matchedSkills = required.filter((skill) => 
    candidate.includes(skill)
    );

    const missingSkills = required.filter(
        (skill) => !candidate.includes(skill) 
    
    );

    const percentage = required.length === 0
    ? 0 : Math.round((matchedSkills.length / required.length) * 100
);

return{
    percentage, matchedSkills, missingSkills
};

}


