package com.example.bootshelf.boardscrap.repository.querydsl;

import com.example.bootshelf.boardscrap.model.entity.BoardScrap;
import com.example.bootshelf.user.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardScrapRepositoryCustom {
    Page<BoardScrap> findByUser(User user, Pageable pageable);
    BoardScrap findByUserIdxAndBoardIdx(Integer userIdx, Integer boardIdx);
}
