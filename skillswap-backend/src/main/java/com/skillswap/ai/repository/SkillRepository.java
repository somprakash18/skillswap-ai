package com.skillswap.ai.repository;

import com.skillswap.ai.entity.Skill;
import com.skillswap.ai.entity.enums.SkillCategory;
import com.skillswap.ai.entity.enums.SkillType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserId(Long userId);
    List<Skill> findByStatus(String status);
    List<Skill> findBySkillTypeAndStatus(SkillType skillType, String status);
    List<Skill> findByCategoryAndStatus(SkillCategory category, String status);
    
    @Query("SELECT s FROM Skill s WHERE s.status = 'APPROVED' AND " +
           "(LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.tags) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Skill> searchSkills(@Param("query") String query);
}
